/** Shared limits for the contact form (client checks mirror the server's). */
export const CONTACT_LIMITS = { name: 100, email: 200, subject: 150, message: 5000 } as const;
/** Submissions faster than this after the form rendered are treated as bots. */
export const MIN_FILL_MS = 3000;
export const looksLikeAddress = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export type ContactPayload = {
	name: string;
	email: string;
	subject: string;
	message: string;
	/** Honeypot: hidden from people, filled by naive bots. Must be empty. */
	website: string;
	/** ms timestamp from when the form was rendered. */
	startedAt: number;
};

export type ContactResult =
	| { ok: true }
	| { ok: false; code: 'invalid' | 'rejected' | 'rate_limited' | 'not_configured' | 'send_failed'; field?: keyof ContactPayload; message: string };
