import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LedDisplay, SpecTable, buttonClass, ButtonContent } from '@/components/ee';
import { HomeHero } from '@/components/site/HomeHero';
import { experiences } from '@/data/experience';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
	title: { absolute: 'samuel phan · electrical engineering, uc irvine' },
	description: 'Electrical engineering student at UC Irvine. Embedded systems, automation, robotics. Projects, experience and a contact form.',
	alternates: { canonical: '/' },
};

export default function HomePage() {
	const latest = experiences[0];
	return (
		<main id="main">
			<HomeHero />
			<div className="pf-strip">
				<h2 aria-label="About me" style={{ margin: 0, display: 'flex' }}>
					<LedDisplay value="ABOUT ME" segments={14} size={16} bare bootOnView bootDuration={1800} />
				</h2>
			</div>
			<section style={{ padding: 'var(--space-10) var(--margin-page) var(--space-11)', display: 'flex', justifyContent: 'center' }}>
				<div style={{ width: 'min(1000px,100%)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'var(--space-9)', alignItems: 'start' }}>
					<figure style={{ margin: 0, position: 'relative', aspectRatio: '3/4', width: '100%', maxWidth: 380, justifySelf: 'center', background: 'var(--surface-raised)', overflow: 'hidden' }}>
						<Image src={siteConfig.photo} alt="Samuel Phan looking out over a city at night" fill sizes="(max-width: 720px) 100vw, 380px" style={{ objectFit: 'cover' }} />
					</figure>
					<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
						<p className="ee-prose" style={{ margin: 0, fontSize: 20, color: 'var(--text-strong)', textWrap: 'pretty' }}>
							i&apos;m a senior at uc irvine studying electrical engineering. i like to automate things. i also play pickleball sometimes.
						</p>
						<SpecTable
							rows={[
								['Education', 'B.S. Electrical Engineering, UC Irvine — 2027'],
								[latest.endDate === 'Present' ? 'Now' : 'Previously', 'CMOS image sensor intern, OmniVision'],
								['Also', 'NASA Community College Aerospace Scholars'],
								['Before that', 'Resold sneakers + more, 2019–2024'],
							]}
						/>
						<div>
							<Link href="/about" className={buttonClass({ variant: 'secondary' })}>
								<ButtonContent iconRight="arrow-right">More about me</ButtonContent>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
