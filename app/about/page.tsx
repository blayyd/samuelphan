import type { Metadata } from 'next';
import { RuledHeading } from '@/components/ee';
import { AboutTabs } from '@/components/site/AboutTabs';
import { ABOUT_TABS } from '@/lib/about-tabs';

// Rendered per request so the active tab/filter from the URL is in the server HTML (no flash, no Suspense fallback).
export const dynamic = 'force-dynamic';

type Props = { searchParams: Promise<{ tab?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
	const raw = (await searchParams).tab;
	const tab = (ABOUT_TABS as readonly string[]).find((t) => t === (Array.isArray(raw) ? raw[0] : raw));
	return {
		title: tab && tab !== 'experience' ? `about · ${tab}` : 'about',
		description: 'Experience, education, skills and certificates. CMOS image-sensor intern at OmniVision, EE at UC Irvine, NASA NCAS scholar.',
		alternates: { canonical: '/about' },
	};
}

export default function AboutPage() {
	return (
		<main id="main" style={{ padding: 'var(--space-8) var(--margin-page) var(--space-11)', display: 'flex', flexDirection: 'column', gap: 'var(--space-9)' }}>
			<div className="pf-grid-2" style={{ alignItems: 'end' }}>
				<RuledHeading lines={['About', { text: 'Samuel', aside: ['est.', '2004'] }]} size={56} style={{ fontSize: 'clamp(40px, 11vw, 56px)' }} />
				<p className="ee-prose" style={{ margin: 0, fontSize: 20, color: 'var(--text-strong)', maxWidth: 600 }}>
					Senior electrical engineering student at UC Irvine. Most recently a CMOS image-sensor characterization intern at OmniVision; before that: a five-year e-commerce business, NASA&apos;s NCAS program, and a 6-axis robot arm.
				</p>
			</div>
			<AboutTabs />
		</main>
	);
}
