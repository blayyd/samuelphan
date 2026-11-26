export type Education = {
	degree: string;
	field: string;
	institution: string;
	location: string;
	startDate: string;
	endDate: string;
	gpa?: string;
	achievements: string[];
};

// Content follows Samuel's resume (resume.tex).
export const education: Education[] = [
	{
		degree: 'Bachelor of Science',
		field: 'Electrical Engineering',
		institution: 'University of California, Irvine',
		location: 'Irvine, CA',
		startDate: 'Sep 2025',
		endDate: 'Expected Jun 2027',
		gpa: '3.61/4.0',
		achievements: ['Drones', 'Digital Signals Processing', 'Autonomous Systems'],
	},
];
