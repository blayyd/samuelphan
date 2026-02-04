import { notFound } from 'next/navigation';
import { projects } from '@/lib/constants';
import ProjectDetailContent from '@/components/projects/project-detail-content';

export function generateStaticParams() {
	return projects.map((project) => ({
		slug: project.slug,
	}));
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
	const project = projects.find((p) => p.slug === params.slug);

	if (!project) {
		notFound();
	}

	return <ProjectDetailContent project={project} />;
}
