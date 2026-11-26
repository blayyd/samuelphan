'use client';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { Icon, type IconName } from './Icon';

type Shared = {
	/** Mono caps label above the field. */
	label?: string;
	hint?: string;
	/** Error message — turns the border warn-red. */
	error?: string;
	/** Leading icon. */
	icon?: IconName;
	/** Trailing action button icon, e.g. 'chevron-right' for a one-field submit. */
	actionIcon?: IconName;
	onAction?: () => void;
	className?: string;
};

export type InputProps = Shared &
	(
		| ({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
		| ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
	);

export function Input(props: InputProps) {
	const { label, hint, error, icon, actionIcon, onAction, multiline = false, disabled = false, id, className = '', ...rest } = props;
	const fid = id || (label ? 'f-' + String(label).toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
	const hintId = fid && (error || hint) ? fid + '-hint' : undefined;
	const box = ['ee-input', multiline && 'ee-input--area', error && 'ee-input--error', disabled && 'ee-input--disabled'].filter(Boolean).join(' ');
	const a11y = { 'aria-invalid': error ? true : undefined, 'aria-describedby': hintId };
	return (
		<div className={'ee-field ' + className}>
			{label && <label className="ee-field__label" htmlFor={fid}>{label}</label>}
			<div className={box}>
				{icon && (
					<span className="ee-input__adorn" style={{ paddingRight: 0 }}>
						<Icon name={icon} size={16} />
					</span>
				)}
				{multiline ? (
					<textarea id={fid} disabled={disabled} {...a11y} {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
				) : (
					<input id={fid} disabled={disabled} {...a11y} {...(rest as InputHTMLAttributes<HTMLInputElement>)} />
				)}
				{actionIcon && (
					<span className="ee-input__adorn">
						<button type="button" aria-label="Submit" onClick={onAction}>
							<Icon name={actionIcon} size={18} />
						</button>
					</span>
				)}
			</div>
			{(error || hint) && (
				<span id={hintId} className={'ee-field__hint' + (error ? ' ee-field__hint--error' : '')}>
					{error || hint}
				</span>
			)}
		</div>
	);
}
