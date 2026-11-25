import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, IndexList, LedDisplay, RuledHeading, SpecTable, Tag, Tooltip, buttonClass, ButtonContent, type RuledLine } from '@/components/ee';
import { getProject, projects } from '@/data/projects';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const p = getProject((await params).slug);
	if (!p) return {};
	return {
		title: p.title.toLowerCase(),
		description: p.description,
		alternates: { canonical: `/projects/${p.slug}` },
		openGraph: { title: p.title, description: p.description, images: [{ url: p.image, alt: p.title }] },
	};
}

export default async function ProjectPage({ params }: Props) {
	const { slug } = await params;
	const i = projects.findIndex((x) => x.slug === slug);
	if (i < 0) notFound();
	const p = projects[i];
	const next = projects[(i + 1) % projects.length];
	const words = p.title.split(' ');
	const lines: Array<string | RuledLine> = [{ text: 'EE/', strong: String(i + 1).padStart(2, '0') }];
	if (words.length <= 2) lines.push(words.join(' '));
	else {
		lines.push(words.slice(0, Math.ceil(words.length / 2)).join(' '));
		lines.push(words.slice(Math.ceil(words.length / 2)).join(' '));
	}
	const gallery = p.gallery ? [p.image, ...p.gallery] : null;
	return (
		<main id="main">
			<section className="pf-grid-2" style={{ padding: 'var(--space-6) var(--margin-page) var(--space-9)', alignItems: 'end' }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
					<div>
						<Link href="/projects" className={buttonClass({ variant: 'ghost' })}>
							<ButtonContent icon="arrow-left">all projects</ButtonContent>
						</Link>
					</div>
					<RuledHeading lines={lines} size={52} style={{ fontSize: 'clamp(30px, 8.4vw, 52px)' }} />
				</div>
				<div style={{ display: 'flex', gap: 'var(--space-6)', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
					{p.stats.map(([v, l]) => (
						<LedDisplay key={l} value={v} labels={[l]} size={40} />
					))}
				</div>
			</section>
			<div style={{ position: 'relative', background: 'var(--surface-raised)', aspectRatio: '21/9', overflow: 'hidden' }}>
				<Image src={p.image} alt={p.title} fill priority sizes="100vw" style={{ objectFit: p.fit }} />
			</div>
			<section className="pf-grid-2" style={{ padding: 'var(--space-10) var(--margin-page)', alignItems: 'start' }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
					<p className="ee-prose" style={{ margin: 0, fontSize: 22, color: 'var(--text-strong)', maxWidth: 600, textWrap: 'pretty' }}>
						{p.intro}
					</p>
					<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
						{p.tags.map((t) => (
							<Tag key={t} variant="outline">
								{t}
							</Tag>
						))}
					</div>
					<div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
						{p.link && (
							<Button href={p.link} target="_blank" rel="noopener" iconRight="external-link">
								{p.linkLabel || 'Live demo'}
							</Button>
						)}
						{p.repo && (
							<Button href={p.repo} target="_blank" rel="noopener" variant={p.link ? 'secondary' : 'primary'} icon="github">
								View source
							</Button>
						)}
						{!p.link && !p.repo && (
							<Tooltip text="Write-up coming">
								<Button variant="secondary" disabled>
									Write-up
								</Button>
							</Tooltip>
						)}
					</div>
				</div>
				<SpecTable
					caption="Key specifications"
					rows={[
						['Category', p.category],
						['Role', p.role],
						['Stack', p.tags.slice(0, 3).join(', ')],
						...p.stats.map(([v, l]): [string, string] => [l, v]),
					]}
				/>
			</section>
			{gallery && (
				<section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 2 }}>
					{gallery.map((g, k) => (
						<div key={g} style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', background: 'var(--surface-raised)' }}>
							<Image src={g} alt={p.captions?.[k] ? `${p.title}: ${p.captions[k]}` : p.title} fill sizes="(max-width: 800px) 100vw, 50vw" style={{ objectFit: 'cover' }} />
							{p.captions?.[k] && (
								<div style={{ position: 'absolute', left: 24, top: 24 }}>
									<Tag>{p.captions[k]}</Tag>
								</div>
							)}
						</div>
					))}
				</section>
			)}
			<section style={{ padding: 'var(--space-11) var(--margin-page)', display: 'flex', justifyContent: 'center' }}>
				<div style={{ width: 'min(600px,100%)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
					<RuledHeading as="h2" lines={['Features', { text: 'List', aside: [p.role] }]} size={48} style={{ fontSize: 'clamp(34px, 10vw, 48px)' }} />
					<IndexList items={p.points} size={24} style={{ fontSize: 'clamp(17px, 4.6vw, 24px)' }} />
				</div>
			</section>
			<Link href={`/projects/${next.slug}`} className="pf-next">
				<span className="ee-micro">next project</span>
				<span className="ee-nav">{next.title.toLowerCase()}</span>
				<span className="pf-next__arrow" aria-hidden="true">
					→
				</span>
			</Link>
		</main>
	);
}
