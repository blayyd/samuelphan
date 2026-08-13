export type Harmonic = {
	k: number;
	amp: number;
	phase: number;
	label: string;
	color: string;
};

/** Designed harmonic series — not a square/saw recipe, so the composite stays distinctive. */
export const HARMONICS: Harmonic[] = [
	{ k: 1, amp: 1.0, phase: 0, label: 'f0', color: '#e9d5ff' },
	{ k: 2, amp: 0.42, phase: 0.55, label: '2f0', color: '#d8b4fe' },
	{ k: 3, amp: 0.3, phase: 1.15, label: '3f0', color: '#c084fc' },
	{ k: 5, amp: 0.2, phase: 0.4, label: '5f0', color: '#a855f7' },
	{ k: 8, amp: 0.11, phase: 2.05, label: '8f0', color: '#a1a1aa' },
	{ k: 13, amp: 0.06, phase: 0.9, label: '13f0', color: '#71717a' },
];

export const COMPOSITE_COLOR = '#c084fc';

export const PERIODS_ON_SCREEN = 2.25;

export function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

export function lerp(a: number, b: number, t: number): number {
	return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
	const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
	return t * t * (3 - 2 * t);
}

export function harmonicValue(h: Harmonic, xNorm: number, time: number): number {
	return h.amp * Math.sin(2 * Math.PI * h.k * (xNorm + time) + h.phase);
}

export function compositeValue(
	harmonics: readonly Harmonic[],
	xNorm: number,
	time: number
): number {
	let sum = 0;
	for (let i = 0; i < harmonics.length; i++) {
		sum += harmonicValue(harmonics[i], xNorm, time);
	}
	return sum;
}

export function maxCompositeAmp(harmonics: readonly Harmonic[]): number {
	let sum = 0;
	for (let i = 0; i < harmonics.length; i++) {
		sum += harmonics[i].amp;
	}
	return sum;
}
