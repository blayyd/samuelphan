export type SkillCategory = 'technical' | 'software' | 'embedded' | 'soft';

/** Skills are listed as plain tags grouped by category. No ratings. */
export type Skill = {
	name: string;
	category: SkillCategory;
};

export const skillCategoryLabels: Record<SkillCategory, string> = {
	technical: 'design tools & lab',
	software: 'software',
	embedded: 'embedded',
	soft: 'soft',
};

export const skills: Skill[] = [
	// Technical Skills (Design Tools & Lab Equipment)
	{ name: 'LTspice', category: 'technical' },
	{ name: 'Vivado', category: 'technical' },
	{ name: 'KiCad (Schematics/PCB)', category: 'technical' },
	{ name: 'Oscilloscope', category: 'technical' },
	{ name: 'Soldering', category: 'technical' },

	// Software/Programming Skills
	{ name: 'C++', category: 'software' },
	{ name: 'Verilog', category: 'software' },
	{ name: 'Python', category: 'software' },
	{ name: 'Go', category: 'software' },
	{ name: 'MATLAB', category: 'software' },
	{ name: 'LaTeX', category: 'software' },

	// Soft Skills
	{ name: 'Project Management', category: 'soft' },
	{ name: 'Team Leadership', category: 'soft' },
	{ name: 'Problem Solving', category: 'soft' },
	{ name: 'Data Analytics', category: 'soft' },
	{ name: 'Automation', category: 'soft' },

	// Embedded Systems
	{ name: 'Arduino', category: 'embedded' },
	{ name: 'Raspberry Pi', category: 'embedded' },
	{ name: 'ESP8266', category: 'embedded' },
];

export const skillsByCategory = (Object.keys(skillCategoryLabels) as SkillCategory[]).map((category) => ({
	category,
	label: skillCategoryLabels[category],
	skills: skills.filter((s) => s.category === category).map((s) => s.name),
}));
