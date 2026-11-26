import { NextResponse } from 'next/server';
import { CONTACT_LIMITS, MIN_FILL_MS, looksLikeAddress, type ContactPayload, type ContactResult } from '@/lib/contact';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Best-effort per-instance rate limit. Serverless instances do not share memory, so this slows
// a single client down rather than enforcing a global cap.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now: number) {
	const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
	recent.push(now);
	hits.set(ip, recent);
	if (hits.size > 5000) hits.clear();
	return recent.length > MAX_PER_WINDOW;
}

const reply = (body: ContactResult, status: number) => NextResponse.json(body, { status });

export async function POST(req: Request) {
	const now = Date.now();
	let body: Partial<ContactPayload>;
	try {
		body = await req.json();
	} catch {
		return reply({ ok: false, code: 'invalid', message: 'bad request' }, 400);
	}
	const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
	const name = str(body.name);
	const email = str(body.email);
	const subject = str(body.subject);
	const message = str(body.message);
	const website = str(body.website);
	const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;

	if (website) return reply({ ok: false, code: 'rejected', message: 'message rejected' }, 400);
	if (!startedAt || now - startedAt < MIN_FILL_MS || now - startedAt > 24 * 60 * 60 * 1000) {
		return reply({ ok: false, code: 'rejected', message: 'that was fast. wait a few seconds and send again' }, 400);
	}
	if (!looksLikeAddress(email) || email.length > CONTACT_LIMITS.email) return reply({ ok: false, code: 'invalid', field: 'email', message: 'Check the address' }, 400);
	if (!message) return reply({ ok: false, code: 'invalid', field: 'message', message: 'Write a message' }, 400);
	if (name.length > CONTACT_LIMITS.name || subject.length > CONTACT_LIMITS.subject || message.length > CONTACT_LIMITS.message) {
		return reply({ ok: false, code: 'invalid', message: 'too long' }, 400);
	}

	const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
	if (rateLimited(ip, now)) return reply({ ok: false, code: 'rate_limited', message: 'too many messages. try again later' }, 429);

	const apiKey = process.env.RESEND_API_KEY;
	const to = process.env.CONTACT_TO_EMAIL;
	const from = process.env.CONTACT_FROM_EMAIL;
	if (!apiKey || !to || !from) {
		return reply({ ok: false, code: 'not_configured', message: 'the contact form is not connected yet' }, 503);
	}

	const text = [`name: ${name || '(none)'}`, `reply to: ${email}`, `subject: ${subject || '(none)'}`, '', message].join('\n');
	try {
		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
			body: JSON.stringify({
				from,
				to: to.split(',').map((s) => s.trim()).filter(Boolean),
				reply_to: email,
				subject: `[portfolio] ${subject || 'new message'}${name ? ` from ${name}` : ''}`.slice(0, 200),
				text,
			}),
		});
		if (!res.ok) {
			console.error('contact: provider responded', res.status, await res.text().catch(() => ''));
			return reply({ ok: false, code: 'send_failed', message: 'message not sent' }, 502);
		}
	} catch (err) {
		console.error('contact: provider request failed', err);
		return reply({ ok: false, code: 'send_failed', message: 'message not sent' }, 502);
	}
	return reply({ ok: true }, 200);
}
