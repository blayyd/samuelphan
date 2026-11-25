import type { ButtonHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
	icon: IconName;
	/** Required accessible label (also the native title). */
	label: string;
	variant?: 'plain' | 'outline' | 'solid';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export function iconButtonClass(variant: IconButtonProps['variant'] = 'plain', size: IconButtonProps['size'] = 'md', className = '') {
	return ['ee-iconbtn', variant !== 'plain' && 'ee-iconbtn--' + variant, size !== 'md' && 'ee-iconbtn--' + size, className].filter(Boolean).join(' ');
}

export const iconButtonSize = (size: IconButtonProps['size'] = 'md') => (size === 'lg' ? 22 : size === 'sm' ? 14 : 18);

export function IconButton({ icon, label, variant = 'plain', size = 'md', className = '', ...rest }: IconButtonProps) {
	return (
		<button type="button" className={iconButtonClass(variant, size, className)} aria-label={label} title={label} {...rest}>
			<Icon name={icon} size={iconButtonSize(size)} />
		</button>
	);
}
