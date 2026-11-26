import type { Metadata } from 'next';
import { RuledHeading } from '@/components/ee';
import { ProjectGrid } from '@/components/site/ProjectGrid';
import { categoryFromSlug } from '@/data/projects';

// Rendered per request so the active tab/filter from the URL is in the server HTML (no flash, no Suspense fallback).
export const dynamic = 'force-dynamic';

type Props = { searchParams: Promise<{ cat?: string | string[] }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
	const raw = (await searchParams).cat;
	const cat = categoryFromSlug(Array.isArray(raw) ? raw[0] : raw);
	return {
		title: cat ? `projects · ${cat}` : 'projects',
		description: 'Project index: a vision-guided 6-axis robotic arm, an edge-AI fall detector, a 5× faster 3D printer and a concurrent Go automation tool.',
		alternates: { canonical: '/projects' },
	};
}

export default function ProjectsPage() {
	return (
		<main id="main" style={{ padding: 'var(--space-8) var(--margin-page) var(--space-11)', display: 'flex', flexDirection: 'column', gap: 'var(--space-9)' }}>
			<div style={{ width: 'min(600px,100%)' }}>
				<RuledHeading lines={['Projects', { text: 'Index', aside: ['2021 —', '2026'] }]} size={56} style={{ fontSize: 'clamp(40px, 11vw, 56px)' }} />
			</div>
			<ProjectGrid />
		</main>
	);
}
