export type SkillCategory = 'programming' | 'design' | 'embedded' | 'misc';

/** Skills are listed as plain tags grouped by category. No ratings. */
export type Skill = {
	name: string;
	category: SkillCategory;
};

export const skillCategoryLabels: Record<SkillCategory, string> = {
	programming: 'programming',
	design: 'design tools',
	embedded: 'embedded systems',
	misc: 'miscellaneous',
};

// Follows Samuel's resume (resume.tex), plus Soldering.
export const skills: Skill[] = [
	{ name: 'Python', category: 'programming' },
	{ name: 'C++', category: 'programming' },
	{ name: 'Assembly', category: 'programming' },
	{ name: 'Verilog', category: 'programming' },
	{ name: 'MATLAB', category: 'programming' },
	{ name: 'Go', category: 'programming' },

	{ name: 'LTspice', category: 'design' },
	{ name: 'Vivado', category: 'design' },
	{ name: 'Fusion360 CAD', category: 'design' },

	{ name: 'Arduino', category: 'embedded' },
	{ name: 'Raspberry Pi', category: 'embedded' },
	{ name: 'ESP8266', category: 'embedded' },

	{ name: 'Oscilloscope', category: 'misc' },
	{ name: 'Function Generator', category: 'misc' },
	{ name: 'Multimeter', category: 'misc' },
	{ name: 'Soldering', category: 'misc' },
	{ name: 'Linux', category: 'misc' },
	{ name: 'Git', category: 'misc' },
];

export const skillsByCategory = (Object.keys(skillCategoryLabels) as SkillCategory[]).map((category) => ({
	category,
	label: skillCategoryLabels[category],
	skills: skills.filter((s) => s.category === category).map((s) => s.name),
}));
