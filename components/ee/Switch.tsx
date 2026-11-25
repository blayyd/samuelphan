'use client';
import type { InputHTMLAttributes, ReactNode } from 'react';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: ReactNode;
	/** Show the green status LED beside the toggle. Default true. */
	led?: boolean;
	className?: string;
}

export function Switch({ label, led = true, disabled = false, className = '', ...rest }: SwitchProps) {
	return (
		<label className={'ee-switch' + (disabled ? ' ee-switch--disabled' : '') + ' ' + className}>
			<input type="checkbox" role="switch" disabled={disabled} {...rest} />
			<span className="ee-switch__track">
				<span className="ee-switch__thumb" />
			</span>
			{led && <span className="ee-switch__led" />}
			{label}
		</label>
	);
}
