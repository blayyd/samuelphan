'use client';
import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Reads the media query on the client only, so server and first client render agree. */
export function readReducedMotion(): boolean {
	return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia(QUERY).matches;
}

export function usePrefersReducedMotion(): boolean | null {
	const [reduce, setReduce] = useState<boolean | null>(null);
	useEffect(() => {
		if (typeof window.matchMedia !== 'function') {
			setReduce(false);
			return;
		}
		const mq = window.matchMedia(QUERY);
		setReduce(mq.matches);
		const on = () => setReduce(mq.matches);
		mq.addEventListener?.('change', on);
		return () => mq.removeEventListener?.('change', on);
	}, []);
	return reduce;
}
