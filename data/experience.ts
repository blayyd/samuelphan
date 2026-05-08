export type Experience = {
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string[];
	technologies: string[];
};

export const experiences: Experience[] = [
	{
		title: 'Founder',
		company: 'SP Logistics',
		location: 'San Jose, CA',
		startDate: 'Oct 2019',
		endDate: 'Dec 2024',
		description: [
			'Founded and scaled an online arbitrage business by sourcing and reselling limited, high-demand products, generating over $120,000 in total sales',
			'Leveraged data analytics to optimize pricing strategies and maximize profit margins',
			'Built automation tools in Python that cut inventory sourcing time by 40%',
			'Collaborated with a network of sellers to share insights and strategies that improved collective sales outcomes',
		],
		technologies: ['Python', 'Data Analytics', 'Automation', 'E-commerce'],
	},
	{
		title: 'NASA Community College Aerospace Scholars',
		company: 'NASA NCAS Missions 1 & 2',
		location: 'Remote',
		startDate: 'Jan 2025',
		endDate: 'Apr 2025',
		description: [
			'Led research on mechanical systems and mobility solutions for a simulated lunar base, contributing to a team design reviewed by NASA staff',
			'Advised team during meetings and provided feedback on budget decisions',
			'Completed a 5-week online curriculum on NASA missions and STEM career pathways',
		],
		technologies: ['Research', 'Team Leadership', 'Project Management', 'STEM'],
	},
];
