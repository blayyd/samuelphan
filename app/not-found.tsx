import Link from 'next/link';
import { LedDisplay, RuledHeading, buttonClass, ButtonContent } from '@/components/ee';

export default function NotFound() {
	return (
		<main id="main" style={{ padding: 'var(--space-9) var(--margin-page) var(--space-11)', display: 'flex', justifyContent: 'center' }}>
			<div style={{ width: 'min(600px,100%)', display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
				<LedDisplay value="404" labels={['err']} size={40} />
				<RuledHeading lines={['Not', 'Found']} size={56} style={{ fontSize: 'clamp(40px, 11vw, 56px)' }} />
				<p className="ee-prose" style={{ margin: 0 }}>
					no page at this address. it may have moved in the redesign.
				</p>
				<div>
					<Link href="/" className={buttonClass({ variant: 'secondary' })}>
						<ButtonContent icon="arrow-left">home</ButtonContent>
					</Link>
				</div>
			</div>
		</main>
	);
}
