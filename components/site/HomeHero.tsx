'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RuledHeading, buttonClass, ButtonContent } from '@/components/ee';
import { readReducedMotion } from '@/components/ee/usePrefersReducedMotion';
import { siteConfig } from '@/data/site-config';

export function HomeHero() {
	// Server HTML renders the two lines hidden; the client reveals them on a timer, or at once under reduced motion.
	const [shown, setShown] = useState(0);
	useEffect(() => {
		if (readReducedMotion()) {
			setShown(2);
			return;
		}
		const t = [setTimeout(() => setShown(1), 2000), setTimeout(() => setShown(2), 2300)];
		return () => t.forEach(clearTimeout);
	}, []);
	const fade = (n: number) => 'ee-prose pf-fade' + (shown >= n ? '' : ' pf-fade--off');
	return (
		<section style={{ padding: 'var(--space-9) var(--margin-page) var(--space-10)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<div style={{ width: 'min(600px,100%)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
				<RuledHeading lines={["Hi! I'm", 'Samuel', 'Phan']} size={64} style={{ fontSize: 'clamp(44px, 13vw, 64px)' }} animate />
				<RuledHeading
					as="div"
					lines={['Top 90%', 'Pickleball Player']}
					replaceWith={['Electrical', 'Engineer']}
					replaceAfter={1700}
					size={40}
					style={{ fontSize: 'clamp(22px, 6.6vw, 40px)' }}
					animate
					delay={1000}
					keepCaret
				/>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 520 }}>
					<p className={fade(1)} style={{ margin: 0, fontSize: 20, color: 'var(--text-strong)', textWrap: 'pretty' }}>
						ee @ uci with dsp specialization.
					</p>
					<p className={fade(2)} style={{ margin: 0, fontSize: 20, color: 'var(--text-muted)', textWrap: 'pretty' }}>
						interested in autonomous systems, edge AI, and machine learning.
					</p>
				</div>
				<div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
					<div style={{ display: 'flex', gap: 8 }}>
						<Link href="/projects" className={buttonClass({})}>
							<ButtonContent iconRight="arrow-right">View projects</ButtonContent>
						</Link>
						{siteConfig.cv && (
							<a href={siteConfig.cv} className={buttonClass({ variant: 'secondary' })} download>
								<ButtonContent icon="download">CV</ButtonContent>
							</a>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
