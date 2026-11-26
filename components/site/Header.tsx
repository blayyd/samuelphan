'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon, LedDisplay, type IconName } from '@/components/ee';
import { siteConfig } from '@/data/site-config';

type Sub = { label: string; href: string; external?: boolean };
type NavItem = { href: string; icon: IconName; label: string; sub: Sub[] };

const NAV: NavItem[] = [
	{
		href: '/projects',
		icon: 'circuit-board',
		label: 'projects',
		sub: [
			{ label: 'robotics', href: '/projects?cat=robotics' },
			{ label: 'embedded', href: '/projects?cat=embedded' },
			{ label: '3d printing', href: '/projects?cat=3d-printing' },
		],
	},
	{
		href: '/about',
		icon: 'cpu',
		label: 'about',
		sub: [
			{ label: 'experience', href: '/about?tab=experience' },
			{ label: 'education', href: '/about?tab=education' },
			{ label: 'skills', href: '/about?tab=skills' },
		],
	},
	{
		href: '/contact',
		icon: 'radio-tower',
		label: 'contact',
		sub: [
			{ label: 'message', href: '/contact' },
			{ label: 'github', href: siteConfig.links.github, external: true },
			{ label: 'linkedin', href: siteConfig.links.linkedin, external: true },
		],
	},
];

const TZ = 'America/Los_Angeles';

// Nav icons are sized so each drawn glyph spans the full height of the text column beside it
// (24px label + 6px gap + three 13px sub-links at 1.3 line-height ≈ 81px). Lucide glyphs sit inside
// a 24-unit box with some empty margin, so each icon is scaled by its own glyph extent and that
// margin is trimmed with negative margins. The stroke is scaled down to keep lines ~1.8px.
const NAV_TEXT_PX = 81;
const NAV_STROKE_PX = 1.8;
const GLYPH_BOX: Partial<Record<IconName, [x: number, y: number, w: number, h: number]>> = {
	'circuit-board': [3, 3, 18, 18],
	cpu: [2, 2, 20, 20],
	'radio-tower': [2, 2, 20, 20],
};

function navIconProps(name: IconName) {
	const [x, y, w, h] = GLYPH_BOX[name] ?? [2, 2, 20, 20];
	const scale = NAV_TEXT_PX / h;
	const size = 24 * scale;
	return {
		size,
		stroke: NAV_STROKE_PX / scale,
		style: {
			display: 'block',
			margin: `${-y * scale}px ${-(24 - x - w) * scale}px ${-(24 - y - h) * scale}px ${-x * scale}px`,
		},
	};
}
/** Must match the pf-wave animation duration in app/styles/site.css. */
const TOWER_CYCLE_MS = 1200;

function pacificClock(d: Date) {
	const parts = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZoneName: 'short' }).formatToParts(d);
	const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
	return { hhmm: get('hour') + ':' + get('minute'), zone: get('timeZoneName').toLowerCase() || 'pt' };
}

export function Header() {
	const pathname = usePathname() || '/';
	// The clock starts blank so server and client HTML match, then ticks on the client.
	const [clock, setClock] = useState<{ hhmm: string; zone: string } | null>(null);
	useEffect(() => {
		const tick = () => setClock(pacificClock(new Date()));
		tick();
		const i = setInterval(tick, 1000);
		return () => clearInterval(i);
	}, []);

	const [pulse, setPulse] = useState(false);
	// The radio-tower waves pulse while the nav is hovered. animationiteration does not fire reliably for
	// SVG children, so the stop is timed: on leave, finish the current 1.2 s cycle, then turn the pulse off.
	const pulseStart = useRef(0);
	const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	useEffect(() => () => {
		if (stopTimer.current) clearTimeout(stopTimer.current);
	}, []);
	const onEnter = () => {
		if (stopTimer.current) {
			clearTimeout(stopTimer.current);
			stopTimer.current = null;
		}
		if (!pulse) {
			pulseStart.current = performance.now();
			setPulse(true);
		}
	};
	const onLeave = () => {
		if (stopTimer.current) clearTimeout(stopTimer.current);
		const elapsed = performance.now() - pulseStart.current;
		const remaining = TOWER_CYCLE_MS - (elapsed % TOWER_CYCLE_MS);
		stopTimer.current = setTimeout(() => {
			stopTimer.current = null;
			setPulse(false);
		}, remaining);
	};
	const active = (href: string) => pathname === href || pathname.startsWith(href + '/');

	return (
		<header className="pf-header">
			<Link href="/" className="ee-nav pf-wordmark" aria-label="Samuel Phan, home">
				samuel
				<br />
				phan
			</Link>
			<nav className="pf-nav" aria-label="Main" onMouseEnter={onEnter} onMouseLeave={onLeave}>
				{NAV.map((n) => (
					<div key={n.href} className="pf-nav__item">
						<span
							className={
								'pf-nav__icon' + (active(n.href) ? ' pf-nav__icon--active' : '') + (n.icon === 'radio-tower' ? ' pf-tower' + (pulse ? ' pf-tower--on' : '') : '')
							}
						>
							<Icon name={n.icon} {...navIconProps(n.icon)} />
						</span>
						<div className="pf-nav__col">
							<Link href={n.href} className={'ee-nav pf-nav__main' + (active(n.href) ? ' pf-nav__main--active' : '')} aria-current={pathname === n.href ? 'page' : undefined}>
								{n.label}
							</Link>
							<div className="pf-nav__sub">
								{n.sub.map((s) =>
									s.external ? (
										<a key={s.label} href={s.href} target="_blank" rel="noopener">
											{s.label}
										</a>
									) : (
										<Link key={s.label} href={s.href}>
											{s.label}
										</Link>
									),
								)}
							</div>
						</div>
					</div>
				))}
			</nav>
			<div className="pf-header__aside">
				<p className="ee-micro pf-header__blurb">{siteConfig.tagline}</p>
				<LedDisplay value={clock ? clock.hhmm : '!!:!!'} ghost="88:88" labels={['local time', clock ? clock.zone : 'pt']} size={20} />
			</div>
		</header>
	);
}
