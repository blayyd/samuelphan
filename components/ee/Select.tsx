import type { SelectHTMLAttributes } from 'react';
import { Icon } from './Icon';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	/** Strings or {value,label} pairs. */
	options: Array<string | { value: string; label: string }>;
	hint?: string;
	className?: string;
}

export function Select({ label, options = [], hint, id, className = '', disabled = false, ...rest }: SelectProps) {
	const fid = id || (label ? 's-' + String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
	return (
		<div className={'ee-field ' + className}>
			{label && <label className="ee-field__label" htmlFor={fid}>{label}</label>}
			<div className={'ee-input' + (disabled ? ' ee-input--disabled' : '')}>
				<select id={fid} disabled={disabled} {...rest}>
					{options.map((o) =>
						typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.value} value={o.value}>{o.label}</option>,
					)}
				</select>
				<span className="ee-input__adorn" style={{ pointerEvents: 'none' }}>
					<Icon name="chevron-down" size={16} />
				</span>
			</div>
			{hint && <span className="ee-field__hint">{hint}</span>}
		</div>
	);
}
