// Contact goes through the form plus GitHub and LinkedIn. No email address or phone number
// is stored here or rendered anywhere on the site.
export const siteConfig = {
	name: 'Samuel Phan',
	description:
		'Electrical Engineering student at UC Irvine with experience in embedded systems, automation, and robotics.',
	/** Canonical origin; falls back to the Vercel production domain. */
	url:
		process.env.NEXT_PUBLIC_SITE_URL ||
		(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'https://samuelphan.vercel.app'),
	/** Photo used on the home page and as the default share image. */
	photo: '/photos/samuel-griffith-riso-v3.jpg',
	/** CV PDF behind the download buttons. Set to null to hide them. */
	cv: '/resume.pdf' as string | null,
	links: {
		github: 'https://github.com/blayyd',
		githubHandle: 'blayyd',
		linkedin: 'https://linkedin.com/in/samthephan',
		linkedinHandle: 'samthephan',
		location: 'Irvine, CA',
	},
};
