export type Certificate = {
	title: string;
	issuer: string;
	date: string;
	id?: string;
	url?: string;
	pdf?: string;
};

export const certificates: Certificate[] = [
	{
		title: 'MATLAB Onramp',
		issuer: 'MathWorks',
		date: 'Sep 2026',
		url: 'https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted',
		pdf: '/matlab-onramp.pdf',
	},
	{
		title: 'NASA Community College Aerospace Scholars (NCAS) Completion',
		issuer: 'NASA',
		date: 'Apr 2025',
		id: 'NCAS-2025',
		url: 'https://www.nasa.gov/learning-resources/nasa-community-college-aerospace-scholars/',
		pdf: '/ncascompletion.pdf',
	},
];
