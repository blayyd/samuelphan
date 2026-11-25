import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** outline (default hairline) · solid (inverted) · accent (LED red text) · plain (no box) · pill (black lowercase capsule for image overlays). */
	variant?: 'outline' | 'solid' | 'accent' | 'plain' | 'pill';
	/** Status LED dot: on = green, warn = red, off = unlit. */
	status?: 'on' | 'warn' | 'off';
	/** Blink the LED dot (1s stepped). */
	blink?: boolean;
	children?: ReactNode;
	className?: string;
}

export function Badge({ variant = 'outline', status, blink = false, children, className = '', ...rest }: BadgeProps) {
	const cls = ['ee-badge', variant !== 'outline' && 'ee-badge--' + variant, className].filter(Boolean).join(' ');
	return (
		<span className={cls} {...rest}>
			{status && <span className={'ee-badge__dot ee-badge__dot--' + status + (blink ? ' ee-badge__dot--blink' : '')} />}
			{children}
		</span>
	);
}
