'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { fadeIn, staggerContainer } from '@/lib/motion';
import { FourierWaveform } from '@/components/home/fourier-waveform';

/**
 * Spacing scale: all values are multiples of 8px.
 * ─────────────────────────────────────────────
 * Token  px     Used in
 * ─────────────────────────────────────────────
 * p-4    16     container padding
 * py-24  96     section vertical padding (mobile)
 * md:py-40 160  section vertical padding (desktop)
 * mb-4   16     h2 → h1 gap
 * mt-8   32     h1 → paragraph gap
 * mt-16  64     paragraph → buttons gap
 * gap-4  16     button row gap
 * h-32   128    bottom gradient height
 */

export function HeroSection() {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start 64px', 'end end'],
	});
	const copyOpacity = useTransform(scrollYProgress, [0, 0.5, 0.85], [1, 0.7, 0.28]);
	const copyY = useTransform(scrollYProgress, [0, 1], [0, -32]);
	const captionOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
	const scrimOpacity = useTransform(scrollYProgress, [0, 0.45, 0.8], [1, 0.5, 0.12]);

	return (
		<section ref={sectionRef} className="relative h-[200vh]">
			<div className="sticky top-16 h-[calc(100vh-4rem)] supports-[height:100dvh]:h-[calc(100dvh-4rem)] overflow-hidden">
				<FourierWaveform progress={scrollYProgress} />

				<motion.div
					style={{ opacity: scrimOpacity }}
					className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background via-background/75 to-transparent"
				/>

				<motion.div
					style={{ opacity: copyOpacity, y: copyY }}
					className="container relative z-10 flex h-full flex-col items-center justify-center p-4 py-24 md:py-32"
				>
					<motion.div
						variants={staggerContainer()}
						initial="hidden"
						animate="show"
						className="max-w-3xl mx-auto text-center"
					>
						<motion.h2
							variants={fadeIn('up', 0.2)}
							className="text-lg md:text-xl font-medium mb-4 text-muted-foreground tracking-wide uppercase"
						>
							Electrical Engineering Student
						</motion.h2>

						<motion.h1
							variants={fadeIn('up', 0.3)}
							className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
						>
							<span className="text-gradient">Samuel Phan&apos;s</span> Portfolio
						</motion.h1>

						<motion.p
							variants={fadeIn('up', 0.5)}
							className="mt-8 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
						>
							A showcase of my projects, skills, and achievements in electrical engineering, embedded systems, and robotics.
						</motion.p>

						<motion.div
							variants={fadeIn('up', 0.7)}
							className="mt-16 flex flex-wrap gap-4 justify-center"
						>
							<Button size="lg" asChild>
								<Link href="/projects">
									View Projects <ArrowRight className="ml-2 h-4 w-4" />
								</Link>
							</Button>
							<Button size="lg" variant="outline" asChild>
								<Link href="/resume.pdf" download target="_blank" rel="noreferrer">
									Download CV <FileDown className="ml-2 h-4 w-4" />
								</Link>
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>

				<motion.p
					style={{ opacity: captionOpacity }}
					className="pointer-events-none absolute bottom-36 left-6 z-10 text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground"
				>
					Harmonic series · DFT
				</motion.p>

				{/* Bottom gradient */}
				<div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-background to-transparent" />
			</div>
		</section>
	);
}
