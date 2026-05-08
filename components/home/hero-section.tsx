'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown } from 'lucide-react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

import { Button } from '@/components/ui/button';
import { fadeIn, staggerContainer } from '@/lib/motion';

/** Vanta.js NET effect configuration — all tunable values in one place */
const VANTA_CONFIG = {
	el: undefined as unknown as HTMLElement,
	THREE,
	mouseControls: true,
	touchControls: true,
	gyroControls: false,
	minHeight: 8 * 24,   // 192px (8px-based)
	minWidth: 8 * 24,    // 192px (8px-based)
	scale: 0.8,
	scaleMobile: 0.8,
	color: 0xa855f7,
	backgroundColor: 0x0a0a0a,
	points: 10,
	maxDistance: 15,
	spacing: 20,
	showDots: false,
} as const;

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
	const [vantaEffect, setVantaEffect] = useState<any>(null);
	const vantaRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!vantaEffect && vantaRef.current) {
			setVantaEffect(
				NET({
					...VANTA_CONFIG,
					el: vantaRef.current,
				})
			);
		}
		return () => {
			if (vantaEffect) vantaEffect.destroy();
		};
	}, [vantaEffect]);

	return (
		<section className="relative overflow-hidden">
			{/* Vanta.js Background */}
			<div ref={vantaRef} className="absolute inset-0 z-0 opacity-60" />

			{/* Content */}
			<div className="container relative z-10 p-4 py-24 md:py-40 flex flex-col items-center justify-center min-h-[90vh]">
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
						<span className="text-gradient">Samuel Phan's</span> Portfolio
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
							<Link href="/resume.pdf" download>
								Download CV <FileDown className="ml-2 h-4 w-4" />
							</Link>
						</Button>
					</motion.div>
				</motion.div>
			</div>

			{/* Bottom gradient */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
		</section>
	);
}
