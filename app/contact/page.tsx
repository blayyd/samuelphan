import type { Metadata } from 'next';
import { RuledHeading, SpecTable } from '@/components/ee';
import { ContactForm } from '@/components/site/ContactForm';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
	title: 'contact',
	description: 'Send a message through the form, or find me on GitHub and LinkedIn. Based in Irvine, CA.',
	alternates: { canonical: '/contact' },
};

export default function ContactPage() {
	const L = siteConfig.links;
	return (
		<main
			id="main"
			style={{ padding: 'var(--space-8) var(--margin-page) var(--space-11)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'var(--space-10)', alignItems: 'start' }}
		>
			<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
				<RuledHeading lines={['Get in', 'Touch']} size={56} style={{ fontSize: 'clamp(40px, 11vw, 56px)' }} />
				<SpecTable
					rows={[
						['Location', L.location],
						[
							'GitHub',
							<a key="gh" href={L.github} target="_blank" rel="noopener">
								{'@' + L.githubHandle}
							</a>,
						],
						[
							'LinkedIn',
							<a key="li" href={L.linkedin} target="_blank" rel="noopener">
								{L.linkedinHandle}
							</a>,
						],
					]}
				/>
			</div>
			<ContactForm />
		</main>
	);
}
