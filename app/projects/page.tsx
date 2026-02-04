'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { projects } from '@/lib/constants';
import { staggerContainer, fadeInScale } from '@/lib/motion';

export default function ProjectsPage() {
	return (
		<div className="py-16 md:py-24">
			<div className="container">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					animate="show"
				>
					<motion.div
						variants={fadeInScale(0.2)}
						className="text-center mb-12"
					>
						<h1 className="text-4xl font-bold mb-4">Projects</h1>
						<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
							A showcase of my engineering projects, demonstrating practical application
							of skills and innovative problem-solving.
						</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project, index) => (
							<motion.div
								key={index}
								variants={fadeInScale(index * 0.1)}
								className="flex"
							>
								<Link href={`/projects/${project.slug}`} className="flex w-full group">
									<Card className="flex flex-col h-full card-gradient transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:-translate-y-1 w-full">
										<div className="relative h-48 w-full overflow-hidden">
											<Image
												src={project.image}
												alt={project.title}
												fill
												className="object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-105"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
										</div>
										<CardContent className="flex-grow p-6">
											<h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
											<p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
											<div className="flex flex-wrap gap-2">
												{project.tags.map((tag, tagIndex) => (
													<Badge key={tagIndex} variant="secondary">
														{tag}
													</Badge>
												))}
											</div>
										</CardContent>
										<CardFooter className="p-6 pt-0 gap-2">
											<div className="flex items-center text-sm font-medium text-primary group-hover:underline">
												View Project Overview
												<ExternalLink className="ml-1 h-3 w-3" />
											</div>
										</CardFooter>
									</Card>
								</Link>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	);
}