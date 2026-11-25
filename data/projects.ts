export type ProjectCategory = 'robotics' | 'embedded' | '3d printing' | 'software';

export type Project = {
	title: string;
	slug: string;
	category: ProjectCategory;
	description: string;
	content?: string;
	/** One-paragraph case-study intro (first person, lab-notebook voice). */
	intro: string;
	/** Feature list, shown as an LED-numbered index. */
	points: string[];
	/** Measured claims shown as LED readouts: [value, unit label]. */
	stats: Array<[string, string]>;
	role: string;
	image: string;
	/** object-fit for the image: contain for renders, cover for photos. */
	fit: 'cover' | 'contain';
	/** Black pill badge over the card image, e.g. "team lead". */
	badge?: string;
	tags: string[];
	link?: string;
	linkLabel?: string;
	repo?: string;
	gallery?: string[];
	/** Caption tags for the gallery, in order: hero image first, then each gallery image. */
	captions?: string[];
};

export const projects: Project[] = [
	{
		title: 'Arctos 6-Axis Robotic Arm',
		slug: 'arctos-robotic-arm',
		category: 'robotics',
		intro:
			'A high-precision motion-control and mechanical-design project. As project lead I coordinated a multidisciplinary team of 7 to design, 3D print and assemble a 600 mm tall arm, with custom end effectors, driven by an Arduino Mega interfacing sensors and stepper motors.',
		points: ['3D-printed structural integrity for payload', 'Inverse kinematics for smooth movement', 'ROS2 control and simulation', 'Custom end effector'],
		stats: [['6', 'axes'], ['600', 'mm'], ['7', 'team']],
		role: 'Project lead',
		fit: 'contain',
		badge: 'team lead',
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
	},
	{
		title: 'UnderWatch',
		slug: 'underwatch',
		category: 'embedded',
		intro:
			'A fall-detection system built at IrvineHacks 2026, using local edge AI and computer vision. I programmed the Arduino Uno Q to talk to the USB webcam, trained the model in Edge Impulse, and integrated it into one working unit.',
		points: ['Custom image-classification model, 83\u00a0% accuracy', 'Real-time confidence scoring', 'Local edge processing for privacy and speed'],
		stats: [['83', '% acc.']],
		role: 'Embedded + ML',
		fit: 'cover',
		badge: 'irvinehacks',
		captions: ['Rig c/o irvinehacks', 'Detection c/o edge impulse'],
		description:
			'Elder monitoring system that uses local edge AI and Computer Vision built at IrvineHacks 2027. Uses an image categorization ML model that reached an accuracy of 83%. Uses confidence scoring for fall detection.',
		content: `
			UnderWatch is a fall detection system built at IrvineHacks 2026, leveraging local edge AI and Computer Vision to enhance safety and autonomy.
			
			Key features include:
			- Custom-trained image categorization ML model with 83% accuracy.
			- Real-time confidence scoring for reliable fall detection.
			- Local edge processing for privacy and speed.
			
			My contributions included programming the Arduino Uno Q to connect to the USB webcam, training the ML model using Edge Impulse, and integrating the system into a cohesive solution for elder monitoring.
		`,
		image: '/underwatch.png',
		tags: ['Edge AI', 'Computer Vision', 'Machine Learning', 'Arduino', 'Python'],
		link: 'https://devpost.com/software/ai-gf',
		linkLabel: 'DevPost',
		repo: 'https://github.com/kevinlycc/UnderWatch',
		gallery: ['/underwatch_example.jpg'],
	},
	{
		title: 'Custom Ender 3 V2',
		slug: 'custom-ender-3-v2',
		category: '3d printing',
		intro: 'A complete overhaul of a stock Creality Ender 3 V2. The result: 5× reliable print speed at better quality than stock settings.',
		points: ['Direct-drive extruder conversion', 'All-metal hotend', 'Silent mainboard, TMC2209 drivers', 'Raspberry Pi 4 running Klipper', 'Pressure advance + input shaping'],
		stats: [['5', '× speed'], ['4', 'upgrades'], ['0', 'downtime']],
		role: 'Solo build',
		fit: 'cover',
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
	},
	{
		title: 'Dart IO Nike Generator',
		slug: 'dart-io-nike-generator',
		category: 'software',
		intro: 'A high-performance automation tool written in Go, designed for scale and speed.',
		points: ['Concurrent generation with goroutines', 'Proxy rotation', 'SMS API phone verification', 'Headless browser automation'],
		stats: [['10', '× faster'], ['100', '% unique']],
		role: 'Solo build',
		fit: 'cover',
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
		repo: 'https://github.com/blayyd/dart-nike-gen',
	},
];

export const projectCategories: ProjectCategory[] = ['robotics', 'embedded', '3d printing', 'software'];

/** URL-safe form of a category, used in `?cat=`. */
export const categorySlug = (c: ProjectCategory) => c.replace(/\s+/g, '-');

export const categoryFromSlug = (slug: string | null | undefined): ProjectCategory | undefined =>
	projectCategories.find((c) => categorySlug(c) === slug);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
