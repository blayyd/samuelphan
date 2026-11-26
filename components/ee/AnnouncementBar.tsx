import type { ReactNode } from 'react';
import { Icon } from './Icon';

export interface AnnouncementBarProps {
	/** paper = light gray strip, black mono caps · led = black strip, red 14-segment text. */
	variant?: 'paper' | 'led';
	onClose?: () => void;
	children?: ReactNode;
	className?: string;
}

/** Ported for completeness; the owner's rules keep it off the site (no top announcement bar). */
export function AnnouncementBar({ variant = 'paper', onClose, children, className = '' }: AnnouncementBarProps) {
	return (
		<div className={'ee-bar' + (variant === 'led' ? ' ee-bar--led' : '') + ' ' + className} role="status">
			<span>{children}</span>
			{onClose && (
				<button className="ee-bar__close" aria-label="Dismiss" onClick={onClose}>
					<Icon name="x" size={16} stroke={1.25} />
				</button>
			)}
		</div>
	);
}
