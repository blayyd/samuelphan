'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent } from '@/components/ui/card';
import { fadeIn, staggerContainer } from '@/lib/motion';

export function AboutPreview() {
	return (
		<section className="py-16 md:py-24" id="about">
			<div className="container px-4">
				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
				>
					<motion.div variants={fadeIn('right', 0.3)} className="space-y-6">
						<SectionHeader
							title="About Me"
							description="I am a passionate electrical engineering student at UC Irvine with a focus on embedded systems, robotics, and automation."
							className="text-left md:text-left mx-0"
						/>
						<p className="text-lg text-muted-foreground">
							My academic journey and hands-on projects have equipped me with
							strong technical skills in circuit design, programming, and hardware integration.
						</p>
						<div className="space-y-4">
							<h3 className="text-2xl font-semibold">My Journey</h3>
							<p className="text-muted-foreground">
								From founding an e-commerce business that generated over $120,000 in sales to participating
								in NASA's Community College Aerospace Scholars program, I've developed a unique blend of
								entrepreneurial and technical skills. Currently, I'm leading a team to build a 6-axis robotic
								arm and continuously pushing the boundaries of what's possible with embedded systems.
							</p>
						</div>
					</motion.div>

					<motion.div variants={fadeIn('left', 0.3)} className="relative h-[500px]">
						<Image
							src="/profilepic.jpeg"
							alt="Samuel Phan's profile photo"
							fill
							className="object-cover rounded-lg"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</motion.div>
				</motion.div>

				<motion.div
					variants={staggerContainer()}
					initial="hidden"
					whileInView="show"
					viewport={{ once: true }}
					className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
				>
					<motion.div variants={fadeIn('up', 0.1)}>
						<Card className="h-full card-gradient">
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-4">Education</h3>
								<p className="text-muted-foreground">
									Currently pursuing a B.S. in Electrical Engineering at UC Irvine (3.51 GPA),
									with prior studies at Foothill College (3.82 GPA).
								</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div variants={fadeIn('up', 0.2)}>
						<Card className="h-full card-gradient">
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-4">Experience</h3>
								<p className="text-muted-foreground">
									Founded SP Logistics generating $120K+ in sales, and participated in
									NASA NCAS program leading research on lunar mobility systems.
								</p>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div variants={fadeIn('up', 0.3)}>
						<Card className="h-full card-gradient">
							<CardContent className="p-6">
								<h3 className="text-xl font-semibold mb-4">Skills</h3>
								<p className="text-muted-foreground">
									Proficient in C++, Python, Verilog, and embedded systems (Arduino, Raspberry Pi).
									Experienced with circuits, oscilloscopes and soldering.
								</p>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}