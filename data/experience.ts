export type Experience = {
	title: string;
	company: string;
	location: string;
	startDate: string;
	endDate: string;
	description: string[];
	technologies: string[];
};

// Content follows Samuel's resume (resume.tex).
export const experiences: Experience[] = [
	{
		title: 'CMOS Image Sensor Characterization Intern',
		company: 'OmniVision',
		location: 'Santa Clara, CA',
		startDate: 'Jun 2026',
		endDate: 'Sep 2026',
		description: [
			'Developed Python A/B and smoke tests to compare sensor characterization scripts using identical hardware captures and frame replay',
			'Analyzed 20+ implementation differences across 8 characterization workflows, tracing numerical discrepancies to measurement algorithms',
			'Identified noise KPI aggregation and DN-to-electron conversion discrepancies, leading to fixes implemented in updated characterization scripts',
		],
		technologies: ['Python', 'Test Automation', 'CMOS Image Sensors', 'Data Analysis'],
	},
	{
		title: 'NASA Community College Aerospace Scholars',
		company: 'NASA NCAS Missions 1 & 2',
		location: 'Remote',
		startDate: 'Jan 2025',
		endDate: 'Apr 2025',
		description: [
			'Researched mechanical systems and mobility options for a simulated lunar base design reviewed by NASA staff',
			'Advised a 13-member team on mechanical component budget decisions for the lunar base design',
		],
		technologies: ['Research', 'Mechanical Systems', 'Team Leadership'],
	},
];
