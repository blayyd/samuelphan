import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Icon, type IconName } from './Icon';

type Common = {
	/** primary = solid ink; secondary = 1px outline; ghost = lowercase text link; led = red segment-display label. */
	variant?: 'primary' | 'secondary' | 'ghost' | 'led';
	size?: 'sm' | 'md' | 'lg';
	/** Leading icon. */
	icon?: IconName;
	/** Trailing icon (e.g. 'arrow-right', 'arrow-up-right'). */
	iconRight?: IconName;
	/** Full-width. */
	block?: boolean;
	children?: ReactNode;
	className?: string;
};

export type ButtonProps = Common &
	(
		| ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
		| ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
	);

export function buttonClass({ variant = 'primary', size = 'md', block = false, className = '' }: Pick<Common, 'variant' | 'size' | 'block' | 'className'>) {
	return ['ee-btn', 'ee-btn--' + variant, size !== 'md' && 'ee-btn--' + size, block && 'ee-btn--block', className].filter(Boolean).join(' ');
}

export function ButtonContent({ icon, iconRight, size = 'md', children }: Pick<Common, 'icon' | 'iconRight' | 'size' | 'children'>) {
	const s = size === 'lg' ? 18 : size === 'sm' ? 14 : 16;
	return (
		<>
			{icon && <Icon name={icon} size={s} />}
			{children}
			{iconRight && <Icon name={iconRight} size={s} />}
		</>
	);
}

export function Button(props: ButtonProps) {
	const { variant, size, icon, iconRight, block, children, className, ...rest } = props;
	const cls = buttonClass({ variant, size, block, className });
	const content = <ButtonContent icon={icon} iconRight={iconRight} size={size}>{children}</ButtonContent>;
	if (rest.href !== undefined) {
		const { href, ...a } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
		return <a className={cls} href={href} {...a}>{content}</a>;
	}
	const b = rest as ButtonHTMLAttributes<HTMLButtonElement>;
	return <button type="button" className={cls} {...b}>{content}</button>;
}
