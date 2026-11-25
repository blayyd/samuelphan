import Link from 'next/link';
import { Icon, buttonClass, ButtonContent, iconButtonClass, iconButtonSize } from '@/components/ee';
import { siteConfig } from '@/data/site-config';

const LINKS: Array<[string, string]> = [
	['projects', '/projects'],
	['experience', '/about?tab=experience'],
	['education', '/about?tab=education'],
	['skills', '/about?tab=skills'],
	['contact', '/contact'],
];

export function Footer() {
	const L = siteConfig.links;
	return (
		<footer>
			<section className="pf-cta">
				<div className="ee-label" style={{ fontSize: 14, color: 'var(--text-strong)' }}>
					Get in touch c/o Samuel Phan
				</div>
				<p className="ee-prose" style={{ margin: 0, maxWidth: 520, fontSize: 17 }}>
					Have a question or want to work together? Send a message through the contact form.
				</p>
				<Link href="/contact" className={buttonClass({ variant: 'secondary' })}>
					<ButtonContent iconRight="arrow-right">Contact</ButtonContent>
				</Link>
			</section>
			<div className="pf-footbar">
				<span style={{ color: 'var(--text-primary)' }}>{L.location.toLowerCase()}</span>
				<nav className="pf-footbar__nav" aria-label="Footer">
					{LINKS.map(([l, href]) => (
						<Link key={l} href={href}>
							{l}
						</Link>
					))}
				</nav>
				<div className="pf-footbar__end">
					<a className={iconButtonClass('plain', 'sm')} href={L.github} target="_blank" rel="noopener" aria-label="GitHub" title="GitHub">
						<Icon name="github" size={iconButtonSize('sm')} />
					</a>
					<a className={iconButtonClass('plain', 'sm')} href={L.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
						<Icon name="linkedin" size={iconButtonSize('sm')} />
					</a>
					<Link className={iconButtonClass('plain', 'sm')} href="/contact" aria-label="Message" title="Message">
						<Icon name="mail" size={iconButtonSize('sm')} />
					</Link>
					<span style={{ color: 'var(--text-primary)', marginLeft: 12 }}>©{new Date().getFullYear()} samuel phan</span>
				</div>
			</div>
		</footer>
	);
}
