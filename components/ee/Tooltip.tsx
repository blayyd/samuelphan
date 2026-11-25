import type { ReactNode } from 'react';

export interface TooltipProps {
	text: string;
	placement?: 'top' | 'bottom';
	/** Force visible (docs/previews). */
	open?: boolean;
	children: ReactNode;
	className?: string;
}

export function Tooltip({ text, placement = 'top', open = false, children, className = '' }: TooltipProps) {
	return (
		<span className={'ee-tip' + (open ? ' ee-tip--open' : '') + ' ' + className}>
			{children}
			<span role="tooltip" className={'ee-tip__bubble' + (placement === 'bottom' ? ' ee-tip__bubble--bottom' : '')}>
				{text}
			</span>
		</span>
	);
}
