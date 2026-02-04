import { notFound } from 'next/navigation';
import { projects } from '@/lib/constants';
import ProjectDetailContent from '@/components/projects/project-detail-content';

export function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.slug,
	}));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const resolvedParams = await params;
	const project = projects.find((p) => p.slug === resolvedParams.slug);

	if (!project) {
		notFound();
	}

	return <ProjectDetailContent project={project} />;
}
