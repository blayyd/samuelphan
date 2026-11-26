import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from './Icon';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
	/** label = white box, black mono caps (image-overlay caption) · outline = hairline chip (skills, tools) · inverse = black box. */
	variant?: 'label' | 'outline' | 'inverse';
	/** Shows an × button. */
	onRemove?: () => void;
	children?: ReactNode;
	className?: string;
}

export function Tag({ variant = 'label', onRemove, children, className = '', ...rest }: TagProps) {
	const cls = ['ee-tag', variant !== 'label' && 'ee-tag--' + variant, className].filter(Boolean).join(' ');
	return (
		<span className={cls} {...rest}>
			{children}
			{onRemove && (
				<button type="button" aria-label="Remove" onClick={onRemove}>
					<Icon name="x" size={12} stroke={1.5} />
				</button>
			)}
		</span>
	);
}
