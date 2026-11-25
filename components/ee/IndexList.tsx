import type { CSSProperties } from 'react';

export interface IndexListProps {
	/** Strings or {label, href}. */
	items: Array<string | { label: string; href?: string }>;
	/** Font size px of the caps labels. Default 32. */
	size?: number;
	/** How many numbers are lit; the rest show dim. Default all. */
	lit?: number;
	start?: number;
	className?: string;
	style?: CSSProperties;
}

export function IndexList({ items = [], size = 32, lit, start = 1, className = '', style }: IndexListProps) {
	const litN = lit == null ? items.length : lit;
	return (
		<ol className={'ee-index ' + className} style={{ fontSize: size, ...style }}>
			{items.map((it, i) => {
				const n = String(i + start).padStart(2, '0');
				const item = typeof it === 'string' ? { label: it } : it;
				return (
					<li key={i}>
						<span className={'ee-index__num' + (i >= litN ? ' ee-index__num--off' : '')}>{n}</span>
						{item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
					</li>
				);
			})}
		</ol>
	);
}
