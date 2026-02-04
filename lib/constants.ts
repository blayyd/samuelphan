export const siteConfig = {
	name: 'Samuel Phan',
	description:
		'Electrical Engineering student at UC Irvine with experience in embedded systems, automation, and robotics.',
	mainNav: [
		{
			title: 'Home',
			href: '/',
		},
		{
			title: 'About',
			href: '/about',
		},
		{
			title: 'Education',
			href: '/education',
		},
		{
			title: 'Skills',
			href: '/skills',
		},
		{
			title: 'Experience',
			href: '/experience',
		},
		{
			title: 'Projects',
			href: '/projects',
		},
		{
			title: 'Certificates',
			href: '/certificates',
		},
		{
			title: 'Blog',
			href: '/blog',
		},
		{
			title: 'Contact',
			href: '/contact',
		},
	],
	links: {
		github: 'https://github.com/blayyd',
		linkedin: 'https://linkedin.com/in/samthephan',
		email: 'mailto:samuelphan21@gmail.com',
		phone: 'tel:+14088332906',
	},
};

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

export type Project = {
	title: string;
	description: string;
	image: string;
	tags: string[];
	link?: string;
	repo?: string;
};

export const projects: Project[] = [
	{
		title: 'Arctos 6-Axis Robotic Arm',
		description:
			'Leading project management for a team of 7 members to build a 600mm tall robotic arm with 3D printed parts and custom end effector. Programming Arduino Mega with Arctos Studio/ROS2 to interface with sensors, motors, and control electronics.',
		image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg',
		tags: ['Arduino', 'ROS2', '3D Printing', 'Robotics', 'Project Management'],
		link: '#',
		repo: '#',
	},
	{
		title: 'Custom Ender 3 V2',
		description:
			'Boosted print speed 5x over stock performance by modifying a Creality Ender 3 V2 with upgraded hotend, extruder, and mainboard. Integrated Raspberry Pi running Klipper firmware for remote monitoring and zero downtime.',
		image: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg',
		tags: ['Raspberry Pi', 'Klipper', 'CAD', '3D Printing', 'Hardware'],
		link: '#',
		repo: '#',
	},
	{
		title: 'Dart IO Nike Generator',
		description:
			'Developed a browser automation tool in Go to mass-generate Nike accounts, reducing total generation time by 10x using Go\'s concurrency features. Ensured 100% account uniqueness by integrating proxy rotation and SMS API verification.',
		image: 'https://images.pexels.com/photos/1036657/pexels-photo-1036657.jpeg',
		tags: ['Go', 'Automation', 'Concurrency', 'API Integration'],
		link: '#',
		repo: 'https://github.com/blayyd/dart-nike-gen',
	},
];

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
		gpa: '3.51/4.00',
		achievements: [
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
		title: 'Engineering Professional Certification',
		issuer: 'Professional Engineering Association',
		date: 'Nov 2023',
		id: 'CERT-12345',
		url: '#',
		pdf: '/certificates/sample.pdf',
	},
	{
		title: 'CAD Design Specialist',
		issuer: 'Autodesk',
		date: 'Jun 2023',
		id: 'CERT-67890',
		url: '#',
		pdf: '/certificates/sample.pdf',
	},
	{
		title: 'Project Management Fundamentals',
		issuer: 'Project Management Institute',
		date: 'Mar 2023',
		id: 'CERT-24680',
		url: '#',
		pdf: '/certificates/sample.pdf',
	},
];

export type Skill = {
	name: string;
	level: number; // 1-10
	category: 'technical' | 'software' | 'soft' | 'language';
};

export const skills: Skill[] = [
	// Technical Skills (Design Tools & Lab Equipment)
	{ name: 'LTspice', level: 8, category: 'technical' },
	{ name: 'Vivado', level: 7, category: 'technical' },
	{ name: 'KiCad (Schematics/PCB)', level: 8, category: 'technical' },
	{ name: 'Oscilloscope', level: 9, category: 'technical' },
	{ name: 'Soldering', level: 8, category: 'technical' },

	// Software/Programming Skills
	{ name: 'C++', level: 8, category: 'software' },
	{ name: 'Verilog', level: 7, category: 'software' },
	{ name: 'Python', level: 8, category: 'software' },
	{ name: 'Go', level: 7, category: 'software' },
	{ name: 'MATLAB', level: 8, category: 'software' },
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

export type BlogPost = {
	title: string;
	excerpt: string;
	date: string;
	author: string;
	image: string;
	slug: string;
};

export const blogPosts: BlogPost[] = [
	{
		title: 'Building a 6-Axis Robotic Arm from Scratch',
		excerpt: 'My journey building the Arctos robotic arm with 3D printed parts and Arduino control systems.',
		date: 'Jan 15, 2026',
		author: 'Samuel Phan',
		image: 'https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg',
		slug: 'building-robotic-arm',
	},
	{
		title: 'Optimizing 3D Printing with Klipper Firmware',
		excerpt: 'How I achieved 5x faster print speeds on my Ender 3 V2 using Klipper and hardware upgrades.',
		date: 'Jun 10, 2025',
		author: 'Samuel Phan',
		image: 'https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg',
		slug: 'klipper-3d-printing',
	},
	{
		title: 'Lessons from NASA NCAS Program',
		excerpt: 'What I learned about aerospace engineering and team collaboration during the NASA Scholars program.',
		date: 'Apr 20, 2025',
		author: 'Samuel Phan',
		image: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg',
		slug: 'nasa-ncas-experience',
	},
];