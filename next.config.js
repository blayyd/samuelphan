/** @type {import('next').NextConfig} */
const toAbout = (from, tab) => ({ source: from, destination: `/about?tab=${tab}`, permanent: true });

const nextConfig = {
	images: { formats: ['image/avif', 'image/webp'] },
	async redirects() {
		// Routes from the previous site, so old links and search results still land somewhere useful.
		return [
			toAbout('/experience', 'experience'),
			toAbout('/education', 'education'),
			toAbout('/skills', 'skills'),
			toAbout('/certificates', 'certificates'),
		];
	},
};

module.exports = nextConfig;
