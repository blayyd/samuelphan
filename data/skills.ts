export type Skill = {
	name: string;
	level: number; // 1-10
	category: 'technical' | 'software' | 'soft' | 'language';
};

export const skills: Skill[] = [
	// Technical Skills (Design Tools & Lab Equipment)
	{ name: 'LTspice', level: 8, category: 'technical' },
	{ name: 'Vivado', level: 7, category: 'technical' },
	{ name: 'KiCad (Schematics/PCB)', level: 5, category: 'technical' },
	{ name: 'Oscilloscope', level: 9, category: 'technical' },
	{ name: 'Soldering', level: 8, category: 'technical' },

	// Software/Programming Skills
	{ name: 'C++', level: 8, category: 'software' },
	{ name: 'Verilog', level: 7, category: 'software' },
	{ name: 'Python', level: 8, category: 'software' },
	{ name: 'Go', level: 7, category: 'software' },
	{ name: 'MATLAB', level: 6, category: 'software' },
	{ name: 'LaTeX', level: 7, category: 'software' },

	// Soft Skills
	{ name: 'Project Management', level: 8, category: 'soft' },
	{ name: 'Team Leadership', level: 8, category: 'soft' },
	{ name: 'Problem Solving', level: 9, category: 'soft' },
	{ name: 'Data Analytics', level: 7, category: 'soft' },
	{ name: 'Automation', level: 8, category: 'soft' },

	// Embedded Systems (as language category for display)
	{ name: 'Arduino', level: 9, category: 'language' },
	{ name: 'Raspberry Pi', level: 8, category: 'language' },
	{ name: 'ESP8266', level: 7, category: 'language' },
];
