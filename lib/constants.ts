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
	slug: string;
	description: string;
	content?: string;
	image: string;
	tags: string[];
	link?: string;
	repo?: string;
};

export const projects: Project[] = [
	{
		title: 'Arctos 6-Axis Robotic Arm',
		slug: 'arctos-robotic-arm',
		description:
			'Leading project management for a team of 7 members to build a 600mm tall robotic arm with 3D printed parts and custom end effector. Programming Arduino Mega with Arctos Studio/ROS2 to interface with sensors, motors, and control electronics.',
		content: `
			The Arctos 6-Axis Robotic Arm is a sophisticated engineering project focused on high-precision motion control and mechanical design. 
			As the project lead, I coordinated a multidisciplinary team of 7 members to design, 3D print, and assemble a 600mm tall robotic arm.
			
			Key challenges included:
			- Optimizing 3D printed structural integrity for payload capacity.
			- Implementing inverse kinematics for smooth movement.
			- Integrating ROS2 for advanced control and simulation.
			
			The arm features custom-designed end effectors and is powered by an Arduino Mega interfacing with various sensors and stepper motors.
		`,
		image: '/arctos.png',
		tags: ['Arduino', 'ROS2', '3D Printing', 'Robotics', 'Project Management'],
		link: '#',
		repo: '#',
	},
	{
		title: 'Custom Ender 3 V2',
		slug: 'custom-ender-3-v2',
		description:
			'Boosted print speed 5x over stock performance by modifying a Creality Ender 3 V2 with upgraded hotend, extruder, and mainboard. Integrated Raspberry Pi running Klipper firmware for remote monitoring and zero downtime.',
		content: `
			This project involved a complete overhaul of a standard Creality Ender 3 V2 to achieve professional-grade performance.
			
			Upgrades included:
			- Direct drive extruder conversion for better flexible filament handling.
			- All-metal hotend for high-temperature printing.
			- Silent mainboard with TMC2209 drivers.
			- Raspberry Pi 4 running Klipper firmware for pressure advance and input shaping.
			
			The result was a 500% increase in reliable print speeds while maintaining higher quality than stock settings.
		`,
		image: '/ender3.JPEG',
		tags: ['Raspberry Pi', 'Klipper', 'CAD', '3D Printing', 'Hardware'],
		link: '#',
		repo: '#',
	},
	{
		title: 'Dart IO Nike Generator',
		slug: 'dart-io-nike-generator',
		description:
			'Developed a browser automation tool in Go to mass-generate Nike accounts, reducing total generation time by 10x using Go\'s concurrency features. Ensured 100% account uniqueness by integrating proxy rotation and SMS API verification.',
		content: `
			Dart IO is a high-performance automation tool built using Golang, specifically designed for scale and speed.
			
			Features:
			- Concurrent generation using Go routines.
			- Advanced proxy rotation to bypass rate limits.
			- SMS API integration for automated phone verification.
			- Headless browser automation for realistic user behavior.
			
			The tool successfully reduced account generation time significantly while ensuring high success rates and account longevity.
		`,
		image: '/dart.jpg',
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
		title: 'NASA Community College Aerospace Scholars (NCAS) Completion',
		issuer: 'NASA',
		date: 'Apr 2025',
		id: 'NCAS-2025',
		url: 'https://www.nasa.gov/learning-resources/nasa-community-college-aerospace-scholars/',
		pdf: '/ncascompletion.pdf',
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
	{ name: 'Raspberry Pi' , level: 8 , category: 'language' } ,
	{ name: 'ESP8266' , level: 7 , category: 'language' } ,
];
