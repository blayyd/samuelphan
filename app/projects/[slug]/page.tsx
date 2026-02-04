'use client';

import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, ExternalLink, ArrowLeft, Calendar, User, Tag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { projects } from '@/lib/constants';
import { fadeInScale, staggerContainer } from '@/lib/motion';

export default function ProjectDetailPage() {
	const params = useParams();
	const slug = params.slug as string;

	const project = projects.find((p) => p.slug === slug);

	if (!project) {
		notFound();
	}

	return (
		<div className="py-16 md:py-24">
			<div className="container px-4 mx-auto">
				<motion.div
					initial="hidden"
					animate="show"
					variants={staggerContainer()}
				>
					{/* Back Button */}
					<motion.div variants={fadeInScale(0.1)} className="mb-8">
						<Button variant="ghost" asChild className="pl-0 hover:bg-transparent">
							<Link href="/projects" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Projects
							</Link>
						</Button>
					</motion.div>

					{/* Project Header */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						<motion.div variants={fadeInScale(0.2)}>
							<div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl">
								<Image
									src={project.image}
									alt={project.title}
									fill
									className="object-cover"
									priority
								/>
							</div>
						</motion.div>

						<motion.div variants={fadeInScale(0.3)}>
							<h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
							
							<div className="flex flex-wrap gap-3 mb-8">
								{project.tags.map((tag, index) => (
									<Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
										{tag}
									</Badge>
								))}
							</div>

							<p className="text-xl text-muted-foreground mb-8 leading-relaxed">
								{project.description}
							</p>

							<div className="flex flex-wrap gap-4">
								{project.link && project.link !== '#' && (
									<Button asChild size="lg">
										<Link href={project.link} target="_blank" rel="noreferrer">
											<ExternalLink className="mr-2 h-5 w-5" />
											Live Demo
										</Link>
									</Button>
								)}
								{project.repo && project.repo !== '#' && (
									<Button variant="outline" asChild size="lg">
										<Link href={project.repo} target="_blank" rel="noreferrer">
											<Github className="mr-2 h-5 w-5" />
											View Source
										</Link>
									</Button>
								)}
							</div>
						</motion.div>
					</div>

					<Separator className="my-16" />

					{/* Project Content */}
					<div className="max-w-4xl mx-auto">
						<motion.div variants={fadeInScale(0.4)}>
							<h2 className="text-3xl font-bold mb-8">Overview</h2>
							<div className="prose prose-invert max-w-none">
								<div className="whitespace-pre-line text-lg text-muted-foreground leading-relaxed">
									{project.content || "No detailed information available for this project yet."}
								</div>
							</div>
						</motion.div>

						{/* Quick Info Card */}
						<motion.div variants={fadeInScale(0.5)} className="mt-16">
							<Card className="bg-card/50 border-primary/10">
								<CardContent className="p-8">
									<h3 className="text-xl font-bold mb-6">Key Specifications</h3>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="flex items-center">
											<div className="p-3 rounded-full bg-primary/10 mr-4">
												<Tag className="h-5 w-5 text-primary" />
											</div>
											<div>
												<p className="text-sm text-muted-foreground">Category</p>
												<p className="font-medium">{project.tags[0] || 'Engineering'}</p>
											</div>
										</div>
										<div className="flex items-center">
											<div className="p-3 rounded-full bg-primary/10 mr-4">
												<User className="h-5 w-5 text-primary" />
											</div>
											<div>
												<p className="text-sm text-muted-foreground">Role</p>
												<p className="font-medium">Lead Developer</p>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</div>
	);
}
