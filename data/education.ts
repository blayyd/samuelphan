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

export const education: Education[] = [
	{
		degree: 'Bachelor of Science',
		field: 'Electrical Engineering',
		institution: 'University of California, Irvine',
		location: 'Irvine, CA',
		startDate: 'Sep 2025',
		endDate: 'Expected Jun 2027',
		gpa: '3.61/4.00',
		achievements: [
			'Electrical Engineering Scholarship, 2026-2027',
			'Circuit Analysis II',
			'Discrete Time-Signals & Systems',
			'Intro to Digital Logic Design Lab',
		],
	},
	{
		degree: 'Transfer Program',
		field: 'Electrical Engineering',
		institution: 'Foothill College',
		location: 'Los Altos Hills, CA',
		startDate: 'Sep 2023',
		endDate: 'Jun 2025',
		gpa: '3.82/4.00',
		achievements: [
			'Electrical Engineering Transfer Program',
			'NASA Community College Aerospace Scholars (NCAS)',
		],
	},
];
