import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
	const u = (p: string) => new URL(p, siteConfig.url).toString();
	return [
		{ url: u('/'), priority: 1 },
		{ url: u('/projects'), priority: 0.9 },
		...projects.map((p) => ({ url: u(`/projects/${p.slug}`), priority: 0.8 })),
		{ url: u('/about'), priority: 0.7 },
		{ url: u('/contact'), priority: 0.5 },
	];
}
