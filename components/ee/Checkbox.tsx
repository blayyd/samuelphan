import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: ReactNode;
	className?: string;
}

export function Checkbox({ label, disabled = false, className = '', ...rest }: CheckboxProps) {
	return (
		<label className={'ee-check' + (disabled ? ' ee-check--disabled' : '') + ' ' + className}>
			<input type="checkbox" disabled={disabled} {...rest} />
			<span className="ee-check__box" />
			{label}
		</label>
	);
}
