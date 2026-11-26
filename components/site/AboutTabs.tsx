'use client';
import { Badge, LedDisplay, SpecTable, Tabs, Tag, buttonClass, ButtonContent } from '@/components/ee';
import { certificates } from '@/data/certificates';
import { education } from '@/data/education';
import { experiences } from '@/data/experience';
import { siteConfig } from '@/data/site-config';
import { skillsByCategory } from '@/data/skills';
import { useQueryParam } from '@/lib/url-state';
import { ABOUT_TABS, type AboutTab } from '@/lib/about-tabs';


const autoGrid = (min: number) => ({ display: 'grid', gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,${min}px),1fr))` });

export function AboutTabs() {
	const [raw, setRaw] = useQueryParam('tab');
	const tab: AboutTab = (ABOUT_TABS as readonly string[]).includes(raw ?? '') ? (raw as AboutTab) : 'experience';
	return (
		<>
			<Tabs
				variant="text"
				value={tab}
				onChange={(v) => setRaw(v === 'experience' ? null : v)}
				tabs={[...ABOUT_TABS]}
				controls="about-panel"
				aside={
					siteConfig.cv ? (
						<a href={siteConfig.cv} className={buttonClass({ size: 'sm' })} download>
							<ButtonContent icon="download" size="sm">
								CV
							</ButtonContent>
						</a>
					) : undefined
				}
			/>
			<div id="about-panel" role="tabpanel" aria-label={tab}>
				{tab === 'experience' && (
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{experiences.map((e) => (
							<div key={e.company + e.startDate} style={{ ...autoGrid(320), gap: 'var(--space-7)', padding: 'var(--space-7) 0', borderTop: '1px solid var(--rule-strong)' }}>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
									<span className="ee-micro">
										{e.startDate} — {e.endDate}
									</span>
									<h3 className="ee-nav" style={{ margin: 0, fontSize: 28, color: 'var(--text-strong)', lineHeight: 1.05, textTransform: 'none' }}>
										{e.company}
									</h3>
									<span style={{ fontSize: 15, color: 'var(--text-muted)' }}>
										{e.title} · {e.location}
									</span>
									{e.endDate === 'Present' && (
										<div>
											<Badge status="on" blink>
												current
											</Badge>
										</div>
									)}
								</div>
								<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
									<ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 16, color: 'var(--text-primary)' }}>
										{e.description.map((pt) => (
											<li key={pt}>{pt}</li>
										))}
									</ul>
									<div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
										{e.technologies.map((t) => (
											<Tag key={t} variant="outline">
												{t}
											</Tag>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
				{tab === 'education' && (
					<div style={{ ...autoGrid(380), gap: 'var(--space-9)' }}>
						{education.map((ed) => (
							<div key={ed.institution} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, borderBottom: '1px solid var(--rule-strong)', paddingBottom: 12 }}>
									<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
										<h3 className="ee-nav" style={{ margin: 0, fontSize: 28, color: 'var(--text-strong)', textTransform: 'none' }}>
											{ed.institution}
										</h3>
										<span style={{ fontSize: 15, color: 'var(--text-muted)' }}>
											{ed.degree}, {ed.field}
										</span>
									</div>
									{ed.gpa && <LedDisplay value={ed.gpa.split('/')[0]} labels={['gpa']} size={26} />}
								</div>
								<SpecTable
									rows={[
										['Dates', `${ed.startDate} — ${ed.endDate}`],
										['Location', ed.location],
										...ed.achievements.map((n, k): [string, string] => [k ? '' : 'Highlights', n]),
									]}
								/>
							</div>
						))}
					</div>
				)}
				{tab === 'skills' && (
					<div style={{ ...autoGrid(320), gap: 'var(--space-8) var(--space-9)' }}>
						{skillsByCategory.map(({ category, label, skills }) => (
							<div key={category} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
								<h3 className="ee-micro" style={{ margin: 0, fontWeight: 400, borderBottom: '1px solid var(--rule-strong)', paddingBottom: 10 }}>
									{label}
								</h3>
								<div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
									{skills.map((n) => (
										<Tag key={n} variant="outline">
											{n}
										</Tag>
									))}
								</div>
							</div>
						))}
					</div>
				)}
				{tab === 'certificates' && (
					<SpecTable
						caption="Certificates"
						rows={certificates.map((c): [React.ReactNode, React.ReactNode] => [
							c.pdf ? (
								<a key={c.title} href={c.pdf} target="_blank" rel="noopener">
									{c.title}
								</a>
							) : (
								c.title
							),
							`${c.issuer} · ${c.date}`,
						])}
					/>
				)}
			</div>
		</>
	);
}
