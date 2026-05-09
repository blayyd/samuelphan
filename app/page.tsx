'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { HeroSection } from '@/components/home/hero-section';
import { AboutPreview } from '@/components/home/about-preview';
import { ProjectsPreview } from '@/components/home/projects-preview';
import { SkillsPreview } from '@/components/home/skills-preview';
import { ContactPreview } from '@/components/home/contact-preview';
import { AboutPreviewSkeleton, ProjectsPreviewSkeleton } from '@/components/home/home-skeletons';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simulate data loading or wait for window load
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 1000); // Small delay to show skeletons

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			<HeroSection />
			{isLoading ? (
				<>
					<AboutPreviewSkeleton />
					<ProjectsPreviewSkeleton />
				</>
			) : (
				<>
					<AboutPreview />
					<ProjectsPreview />
				</>
			)}
			<SkillsPreview />
			<ContactPreview />
		</>
	);
}