export type ProjectCategory = 'robotics' | 'embedded' | '3d printing' | 'software';

export type Project = {
	title: string;
	slug: string;
	category: ProjectCategory;
	/** When it ran, as on the resume, e.g. "Jan 2025 – Jun 2025". */
	dates: string;
	description: string;
	/** One-paragraph case-study intro (first person, lab-notebook voice). */
	intro: string;
	/** Feature list, shown as an LED-numbered index. */
	points: string[];
	/** Measured claims shown as LED readouts: [value, unit label]. */
	stats: Array<[string, string]>;
	role: string;
	/** Optional line breaks for the ruled title on the project page; defaults to splitting the title in half. */
	headingLines?: string[];
	image: string;
	/** object-fit for the image: contain for renders, cover for photos. */
	fit: 'cover' | 'contain';
	/** Black pill badge over the card image, e.g. "senior design". */
	badge?: string;
	tags: string[];
	link?: string;
	linkLabel?: string;
	repo?: string;
	gallery?: string[];
	/** Caption tags for the gallery, in order: hero image first, then each gallery image. */
	captions?: string[];
};

// Content follows Samuel's resume (resume.tex).
export const projects: Project[] = [
	{
		title: 'Vision-Guided 6-Axis Robotic Arm',
		slug: 'arctos-robotic-arm',
		category: 'robotics',
		dates: 'Sep 2026 – Present',
		description:
			'Senior design project: vision-guided object retrieval with an Arctos 6-axis robotic arm and on-device detection on a Rubik Pi.',
		intro:
			'My senior design project. I am developing vision-guided object retrieval with an Arctos 6-axis arm, with object detection running on-device on a Rubik Pi. I am also defining the arm wiring, the gripper requirements, and the tests for positioning accuracy and retrieval success.',
		points: [
			'Vision-guided object retrieval',
			'On-device detection on Rubik Pi',
			'Arm wiring and gripper requirements',
			'Tests for positioning accuracy and retrieval success',
		],
		stats: [['6', 'axes']],
		role: 'Senior design',
		headingLines: ['Vision-Guided', '6-Axis', 'Robotic Arm'],
		image: '/arctos.png',
		fit: 'contain',
		badge: 'senior design',
		tags: ['Robotics', 'Computer Vision', 'Rubik Pi', 'Edge AI'],
	},
	{
		title: 'UnderWatch',
		slug: 'underwatch',
		category: 'embedded',
		dates: 'Feb 2026',
		description:
			'Elderly fall detection system built at IrvineHacks 2026. An Edge Impulse classifier trained on 328 images reached 83% accuracy with inference under 12 ms, running locally on an Arduino Uno Q.',
		intro:
			'An elderly fall-detection system built at IrvineHacks 2026. I trained an Edge Impulse classifier on 328 images, integrated OpenCV webcam capture with an Arduino Uno Q to classify fall scenarios in real time, and deployed the model on the board so webcam images are processed locally, with no cloud video uploads.',
		points: [
			'Edge Impulse classifier, 328 images, 83\u00a0% accuracy',
			'Inference latency under 12 ms',
			'OpenCV webcam capture on Arduino Uno Q',
			'Local processing, no cloud video uploads',
		],
		stats: [['83', '% acc.'], ['12', 'ms max'], ['328', 'images']],
		role: 'Embedded + ML',
		image: '/underwatch.png',
		fit: 'cover',
		badge: 'irvinehacks',
		tags: ['Edge AI', 'Computer Vision', 'Edge Impulse', 'OpenCV', 'Arduino'],
		link: 'https://devpost.com/software/ai-gf',
		linkLabel: 'DevPost',
		repo: 'https://github.com/kevinlycc/UnderWatch',
		gallery: ['/underwatch_example.jpg'],
		captions: ['Rig c/o irvinehacks', 'Detection c/o edge impulse'],
	},
	{
		title: 'Custom Ender 3 V2 (Klipper Build)',
		slug: 'custom-ender-3-v2',
		category: '3d printing',
		dates: 'Jan 2025 – Jun 2025',
		description:
			'Increased reliable print speed 5x by upgrading an Ender 3 V2 with a direct-drive extruder, all-metal hotend, TMC2209 mainboard and Klipper firmware tuning, with remote monitoring on a Raspberry Pi Zero 2 W.',
		intro:
			'An upgraded Creality Ender 3 V2: direct-drive extruder, all-metal hotend, TMC2209 mainboard and Klipper firmware. Tuning pressure advance and input shaping took reliable print speed to 5× stock, and a Raspberry Pi Zero 2 W runs Klipper for remote monitoring.',
		points: [
			'Direct-drive extruder',
			'All-metal hotend',
			'TMC2209 mainboard',
			'Klipper pressure advance + input shaping',
			'Remote monitoring on Raspberry Pi Zero 2 W',
		],
		stats: [['5', '× speed']],
		role: 'Solo build',
		headingLines: ['Custom', 'Ender 3 V2', 'Klipper Build'],
		image: '/ender3.JPEG',
		fit: 'cover',
		tags: ['Klipper', 'Raspberry Pi', '3D Printing', 'Hardware'],
	},
	{
		title: 'Nike Account Generator',
		slug: 'dart-io-nike-generator',
		category: 'software',
		dates: 'Feb 2021 – Apr 2021',
		description:
			'A Go tool that automates Nike account creation through Chromium browser automation, 10x faster with concurrent goroutines, with proxy rotation and SMS API verification.',
		intro:
			'A Go tool that automates Nike account creation through Chromium browser automation. Running the browser tasks concurrently with goroutines made account creation 10× faster, and proxy rotation and SMS API verification are built into the workflow.',
		points: ['Chromium browser automation', 'Concurrent tasks with goroutines', 'Proxy rotation', 'SMS API verification'],
		stats: [['10', '× faster']],
		role: 'Solo build',
		image: '/dart.jpg',
		fit: 'cover',
		tags: ['Go', 'Concurrency', 'Browser Automation', 'API Integration'],
		repo: 'https://github.com/blayyd/dart-nike-gen',
	},
];

export const projectCategories: ProjectCategory[] = ['robotics', 'embedded', '3d printing', 'software'];

/** URL-safe form of a category, used in `?cat=`. */
export const categorySlug = (c: ProjectCategory) => c.replace(/\s+/g, '-');

export const categoryFromSlug = (slug: string | null | undefined): ProjectCategory | undefined =>
	projectCategories.find((c) => categorySlug(c) === slug);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
