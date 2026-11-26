'use client';
import { useEffect, useState, type CSSProperties } from 'react';
import { readReducedMotion } from './usePrefersReducedMotion';

const RULE_STAGGER = 70,
	RULE_MS = 260,
	CHAR_MS = 28,
	PRE_TYPE = 100,
	DEL_MS = 22,
	RETYPE_MS = 40;

export interface RuledLine {
	text: string;
	/** Appended in bold normal-width cut, e.g. text "EP/" strong "BC". */
	strong?: string;
	/** Superscript, e.g. a unit or footnote marker. No trademark marks. */
	sup?: string;
	/** Small stacked caption at line end, e.g. ['digital','pro']. */
	aside?: string | string[];
}

export interface RuledHeadingProps {
	lines: Array<string | RuledLine>;
	/** Font size px. Default 64. */
	size?: number;
	as?: 'h1' | 'h2' | 'h3' | 'div';
	/** Draw hairlines. Default true. */
	ruled?: boolean;
	/** Intro animation on mount. Skipped under prefers-reduced-motion. */
	animate?: boolean;
	/** ms before the animation starts — chain several headings. */
	delay?: number;
	/** Leave the blinking caret at the end after typing finishes. */
	keepCaret?: boolean;
	/** With animate: after typing `lines`, wait `replaceAfter` ms, backspace them, and retype these lines instead. */
	replaceWith?: Array<string | RuledLine>;
	/** ms to hold the first text before deleting. Default 1500. */
	replaceAfter?: number;
	className?: string;
	style?: CSSProperties;
}

const norm = (ls: Array<string | RuledLine>): RuledLine[] => ls.map((ln) => (typeof ln === 'string' ? { text: ln } : ln));
const count = (L: RuledLine[]) => L.reduce((n, l) => n + l.text.length + (l.strong || '').length, 0);

export function RuledHeading({
	lines = [],
	replaceWith,
	replaceAfter = 1500,
	size = 64,
	as = 'h1',
	ruled = true,
	animate = false,
	delay = 0,
	keepCaret = false,
	className = '',
	style,
}: RuledHeadingProps) {
	const H = as;
	// `anim` starts as the prop and only drops to false on the client when reduced motion is on,
	// so the server HTML and the first client render match.
	const [anim, setAnim] = useState(animate);
	const [stage, setStage] = useState(replaceWith && !animate ? 1 : 0);
	const L = norm(stage === 1 && replaceWith ? replaceWith : lines);
	const total = count(L);
	const [rulesOn, setRulesOn] = useState(animate ? 0 : L.length);
	const [typed, setTyped] = useState(animate ? -1 : total);
	const [caretOff, setCaretOff] = useState(!animate);

	useEffect(() => {
		if (!animate) return;
		if (readReducedMotion()) {
			const Lf = norm(replaceWith || lines);
			setAnim(false);
			setStage(replaceWith ? 1 : 0);
			setRulesOn(Lf.length);
			setTyped(count(Lf));
			setCaretOff(true);
			return;
		}
		const timers: ReturnType<typeof setTimeout>[] = [];
		const at = (t: number, f: () => void) => timers.push(setTimeout(f, t));
		const L1 = norm(lines),
			n1 = count(L1);
		L1.forEach((_, i) => at(delay + i * RULE_STAGGER, () => setRulesOn(i + 1)));
		let t = delay + (L1.length - 1) * RULE_STAGGER + RULE_MS;
		at(t, () => setTyped(0));
		t += PRE_TYPE;
		for (let c = 1; c <= n1; c++) {
			t += CHAR_MS;
			const cc = c;
			at(t, () => setTyped(cc));
		}
		if (replaceWith) {
			const L2 = norm(replaceWith),
				n2 = count(L2);
			t += replaceAfter;
			for (let c = n1 - 1; c >= 0; c--) {
				t += DEL_MS;
				const cc = c;
				at(t, () => setTyped(cc));
			}
			t += 320;
			at(t, () => {
				setStage(1);
				setTyped(0);
				setRulesOn((r) => Math.max(r, L2.length));
			});
			for (let c = 1; c <= n2; c++) {
				t += RETYPE_MS;
				const cc = c;
				at(t, () => setTyped(cc));
			}
		}
		if (!keepCaret) at(t + 600, () => setCaretOff(true));
		return () => timers.forEach(clearTimeout);
		// Runs once on mount, like the source component: the animation is a one-shot intro.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const caret = (
		<span className="ee-ruled__caretwrap" aria-hidden="true">
			<span className="ee-ruled__caret" />
		</span>
	);
	const finalL = norm(replaceWith || lines);
	let offset = 0;
	return (
		<H
			className={'ee-ruled' + (anim ? ' ee-ruled--anim' : '') + ' ' + className}
			style={{ fontSize: size, ...style }}
			aria-label={animate || replaceWith ? finalL.map((l) => l.text + (l.strong || '')).join(' ') : undefined}
		>
			{L.map((l, i) => {
				const strong = l.strong || '';
				const len = l.text.length + strong.length;
				const k = Math.max(0, Math.min(len, typed - offset));
				const current = !caretOff && typed >= offset && (typed < offset + len || (i === L.length - 1 && typed === total));
				offset += len;
				const done = k === len;
				const tv = l.text.slice(0, k),
					th = l.text.slice(k);
				const sk = Math.max(0, k - l.text.length),
					sv = strong.slice(0, sk),
					sh = strong.slice(sk);
				const hide: CSSProperties = { visibility: 'hidden' };
				return (
					<span key={i} className={'ee-ruled__line' + (ruled ? '' : ' ee-ruled__line--bare')}>
						<span>
							{tv}
							{current && sk === 0 && caret}
							{th && <span style={hide}>{th}</span>}
							{strong && (
								<span className="ee-ruled__strong">
									{sv}
									{current && sk > 0 && caret}
									{sh && <span style={hide}>{sh}</span>}
								</span>
							)}
							{l.sup && <sup style={{ fontSize: '.35em', verticalAlign: 'top', lineHeight: 1, visibility: done ? 'visible' : 'hidden' }}>{l.sup}</sup>}
						</span>
						{l.aside && (
							<span className="ee-ruled__aside" style={{ visibility: done ? 'visible' : 'hidden' }}>
								{([] as string[]).concat(l.aside).map((a, j) => (
									<span key={j}>{a}</span>
								))}
							</span>
						)}
						{anim && ruled && <span className={'ee-ruled__rule' + (i < rulesOn ? ' ee-ruled__rule--on' : '')} aria-hidden="true" />}
					</span>
				);
			})}
		</H>
	);
}
