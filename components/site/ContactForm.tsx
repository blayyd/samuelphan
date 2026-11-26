'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, Input } from '@/components/ee';
import { CONTACT_LIMITS, looksLikeAddress, type ContactResult } from '@/lib/contact';
import { siteConfig } from '@/data/site-config';
import { useToast } from './Toasts';

const EMPTY = { name: '', email: '', subject: '', message: '' };

export function ContactForm() {
	const toast = useToast();
	const router = useRouter();
	const [f, setF] = useState(EMPTY);
	const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
	const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle');
	const [failure, setFailure] = useState('');
	const [open, setOpen] = useState(false);
	const honeypot = useRef<HTMLInputElement>(null);
	const startedAt = useRef(0);
	useEffect(() => {
		startedAt.current = Date.now();
	}, []);

	const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (status === 'sending') return;
		const errs: typeof errors = {};
		if (!looksLikeAddress(f.email.trim())) errs.email = 'Check the address';
		if (!f.message.trim()) errs.message = 'Write a message';
		setErrors(errs);
		if (Object.keys(errs).length) {
			toast('ERR', 'error', 'Message not sent');
			return;
		}
		setStatus('sending');
		setFailure('');
		let result: ContactResult;
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...f, website: honeypot.current?.value || '', startedAt: startedAt.current }),
			});
			result = await res.json().catch(() => ({ ok: false, code: 'send_failed', message: 'message not sent' }) as ContactResult);
			if (!res.ok && result.ok) result = { ok: false, code: 'send_failed', message: 'message not sent' };
		} catch {
			result = { ok: false, code: 'send_failed', message: 'no connection. message not sent' };
		}
		if (result.ok) {
			setStatus('sent');
			setOpen(true);
			toast('SENT', 'ok', 'Message sent');
			setF(EMPTY);
			startedAt.current = Date.now();
			return;
		}
		setStatus('failed');
		if (result.field === 'email' || result.field === 'message') setErrors({ [result.field]: result.message });
		setFailure(
			result.code === 'not_configured'
				? 'the form is not connected yet, so nothing was sent. reach me on github or linkedin for now.'
				: result.message + '. nothing was sent; your text is still in the form.',
		);
		toast('ERR', 'error', 'Message not sent');
	};

	return (
		<>
			<form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', maxWidth: 600 }}>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 'var(--gutter)' }}>
					<Input label="Name" name="name" autoComplete="name" placeholder="Your name" maxLength={CONTACT_LIMITS.name} value={f.name} onChange={set('name')} />
					<Input
						label="Email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="Your address"
						maxLength={CONTACT_LIMITS.email}
						value={f.email}
						onChange={set('email')}
						error={errors.email}
						required
					/>
				</div>
				<Input label="Subject" name="subject" placeholder="Internship, project, question" maxLength={CONTACT_LIMITS.subject} value={f.subject} onChange={set('subject')} />
				<Input label="Message" name="message" multiline placeholder="Your message" maxLength={CONTACT_LIMITS.message} value={f.message} onChange={set('message')} error={errors.message} required />
				<div className="pf-hp" aria-hidden="true">
					<label htmlFor="f-website">Website</label>
					<input ref={honeypot} id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
				</div>
				<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
					<Button type="submit" size="lg" iconRight="arrow-right" disabled={status === 'sending'} aria-busy={status === 'sending'}>
						{status === 'sending' ? 'Sending' : 'Send message'}
					</Button>
				</div>
				<p role="alert" className="ee-micro" style={{ margin: 0, minHeight: '1.3em', textTransform: 'none', color: 'var(--status-warn)' }}>
					{status === 'failed' && (
						<>
							{failure}{' '}
							{failure.includes('github') && (
								<>
									<a href={siteConfig.links.github} target="_blank" rel="noopener">
										github
									</a>{' '}
									·{' '}
									<a href={siteConfig.links.linkedin} target="_blank" rel="noopener">
										linkedin
									</a>
								</>
							)}
						</>
					)}
				</p>
			</form>
			<Dialog
				open={open}
				title="Message sent"
				onClose={() => setOpen(false)}
				footer={
					<>
						<Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
							Close
						</Button>
						<Button
							size="sm"
							onClick={() => {
								setOpen(false);
								router.push('/projects');
							}}
						>
							See projects
						</Button>
					</>
				}
			>
				<p className="ee-prose" style={{ margin: 0, fontSize: 17 }}>
					Thanks — your message is in. I&apos;ll get back to you soon.
				</p>
			</Dialog>
		</>
	);
}
