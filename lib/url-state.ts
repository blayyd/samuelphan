'use client';
import { useSearchParams } from 'next/navigation';

/**
 * Reads one query param and writes it back with history.replaceState, which Next keeps in sync with
 * useSearchParams. No navigation or server round trip; the URL stays linkable.
 */
export function useQueryParam(key: string): [string | null, (value: string | null) => void] {
	const params = useSearchParams();
	const value = params.get(key);
	const set = (next: string | null) => {
		const sp = new URLSearchParams(window.location.search);
		if (next == null) sp.delete(key);
		else sp.set(key, next);
		const qs = sp.toString();
		window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : '') + window.location.hash);
	};
	return [value, set];
}
