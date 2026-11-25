import type { InputHTMLAttributes, ReactNode } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: ReactNode;
	name: string;
	value: string;
	className?: string;
}

export function Radio({ label, disabled = false, className = '', ...rest }: RadioProps) {
	return (
		<label className={'ee-check' + (disabled ? ' ee-check--disabled' : '') + ' ' + className}>
			<input type="radio" disabled={disabled} {...rest} />
			<span className="ee-check__box ee-check__box--round" />
			{label}
		</label>
	);
}
