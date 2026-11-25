'use client';
import { ProjectCard, Tabs } from '@/components/ee';
import { categoryFromSlug, categorySlug, projectCategories, projects, type ProjectCategory } from '@/data/projects';
import { useQueryParam } from '@/lib/url-state';

const ALL = 'all projects';

export function ProjectGrid() {
	const [catParam, setCatParam] = useQueryParam('cat');
	const cat: ProjectCategory | typeof ALL = categoryFromSlug(catParam) ?? ALL;
	const list = projects.filter((p) => cat === ALL || p.category === cat);
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-7)' }}>
			<Tabs
				variant="text"
				value={cat}
				onChange={(v) => setCatParam(v === ALL ? null : categorySlug(v as ProjectCategory))}
				tabs={[ALL, ...projectCategories]}
				aside={String(list.length).padStart(2, '0') + ' projects'}
				controls="project-grid"
			/>
			<div id="project-grid" role="tabpanel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,420px),1fr))', gap: 'var(--space-8) var(--gutter)' }}>
				{list.map((p, i) => (
					<ProjectCard
						key={p.slug}
						title={p.title}
						subtitle={p.tags.slice(0, 3).join(' · ')}
						image={p.image}
						fit={p.fit}
						ratio="16/10"
						badge={p.badge}
						href={`/projects/${p.slug}`}
						priority={i < 2}
					/>
				))}
			</div>
		</div>
	);
}
