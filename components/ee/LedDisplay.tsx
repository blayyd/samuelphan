'use client';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { readReducedMotion } from './usePrefersReducedMotion';

const COLORS = {
	red: ['var(--led-red)', 'var(--led-red-dim)', 'var(--led-red-glow)'],
	green: ['var(--pcb-green-lit)', 'var(--pcb-green-dim)', 'rgba(31,203,106,.5)'],
	white: ['var(--white-led)', 'var(--ink-700)', 'rgba(255,255,255,.35)'],
} as const;

export interface LedDisplayProps {
	/** Text to show. 7-seg: digits, - . : and a few letters. 14-seg: full A–Z. */
	value: string | number;
	/** Unlit segment string behind the value; defaults to all-8s (7-seg) / all-~ (14-seg) matching length. */
	ghost?: string;
	/** Tiny mono captions above a hairline, e.g. ['track','index','min','sec']. */
	labels?: string[];
	/** 7 (DSEG7) or 14 (DSEG14 alphanumeric). */
	segments?: 7 | 14;
	/** Font size px. Default 32. */
	size?: number;
	color?: 'red' | 'green' | 'white';
	blink?: boolean;
	/** Power-on animation. Skipped under prefers-reduced-motion. */
	boot?: boolean;
	/** Like boot, but waits until the readout scrolls into view (60% visible). */
	bootOnView?: boolean;
	/** Approx. total boot time in ms. Default 1400. */
	bootDuration?: number;
	/** Drop the black display bezel that wraps LEDs on the light paper theme. */
	bare?: boolean;
	bold?: boolean;
	className?: string;
	style?: CSSProperties;
}

const isOn = (ch: string) => !/[\s.:!]/.test(ch);

export function LedDisplay({
	value = '',
	ghost,
	labels,
	segments = 7,
	size = 32,
	color = 'red',
	blink = false,
	bold = false,
	bare = false,
	boot = false,
	bootOnView = false,
	bootDuration = 1400,
	className = '',
	style,
}: LedDisplayProps) {
	const v = String(value);
	const g = ghost != null ? ghost : v.replace(/[^.:\s]/g, segments === 14 ? '~' : '8');
	const c = COLORS[color] || COLORS.red;
	const wantsBoot = boot || bootOnView;
	const rootRef = useRef<HTMLDivElement>(null);
	const [inView, setInView] = useState(!bootOnView);
	// Server and first client render agree: a booting display starts dark. The reduced-motion check runs in effects only.
	const [shown, setShown] = useState<string[] | null>(() => (wantsBoot ? v.split('').map((ch) => (isOn(ch) ? '!' : ch)) : null));

	useEffect(() => {
		if (!wantsBoot) return;
		if (readReducedMotion()) {
			setShown(null);
			return;
		}
		if (!bootOnView || inView) return;
		const el = rootRef.current;
		if (!el || typeof IntersectionObserver === 'undefined') {
			setInView(true);
			return;
		}
		const io = new IntersectionObserver(
			(es) => {
				if (es.some((e) => e.isIntersecting)) {
					setInView(true);
					io.disconnect();
				}
			},
			{ threshold: 0.6 },
		);
		io.observe(el);
		return () => io.disconnect();
	}, [wantsBoot, bootOnView, inView]);

	useEffect(() => {
		if (!wantsBoot || !inView || readReducedMotion()) return;
		// Power-on: each glyph flickers through partial segment shapes at its own random time, then settles.
		const pool = segments === 14 ? ['-', '_', 'I', 'L', 'J', '7', 'F', 'C', 'r', 'n', '1', '/'] : ['-', '_', '1', '7', 'L', 'J', 'F', 'C', 'r', 'n'];
		const pick = () => pool[Math.floor(Math.random() * pool.length)];
		const timers: ReturnType<typeof setTimeout>[] = [];
		let end = 0;
		setShown(v.split('').map((ch) => (isOn(ch) ? '!' : ch)));
		v.split('').forEach((ch, i) => {
			if (!isOn(ch)) return;
			let t = Math.random() * bootDuration * 0.6;
			const steps = 1 + Math.floor(Math.random() * 3);
			for (let k = 0; k <= steps; k++) {
				const glyph = k === steps ? ch : pick();
				timers.push(
					setTimeout(
						() =>
							setShown((prev) => {
								if (!prev) return prev;
								const n = prev.slice();
								n[i] = glyph;
								return n;
							}),
						t,
					),
				);
				t += 50 + Math.random() * 160;
			}
			end = Math.max(end, t);
		});
		timers.push(setTimeout(() => setShown(null), end + 30));
		return () => timers.forEach(clearTimeout);
	}, [v, wantsBoot, inView, segments, bootDuration]);

	const text = shown ? shown.join('') : v;
	const font = segments === 14 ? 'var(--font-led-alpha)' : 'var(--font-led)';
	const vars = { '--led-color': c[0], '--led-ghost': c[1], '--led-glow': c[2] } as CSSProperties;
	return (
		<div
			ref={rootRef}
			className={'ee-led-display' + (blink ? ' ee-led-display--blink' : '') + (bare ? ' ee-led-display--bare' : '') + ' ' + className}
			style={{ ...vars, ...style }}
		>
			{labels && (
				<div className="ee-led-display__labels">
					{labels.map((l, i) => (
						<span key={i}>{l}</span>
					))}
				</div>
			)}
			<div className="ee-led-display__glass" style={{ fontFamily: font, fontSize: size, fontWeight: bold ? 700 : 400, fontStyle: 'italic' }}>
				<span className="ee-led-display__ghost" aria-hidden="true">
					{g}
				</span>
				<span className="ee-led-display__value" role="img" aria-label={v}>
					{text}
				</span>
			</div>
		</div>
	);
}
