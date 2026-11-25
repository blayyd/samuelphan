import type { CSSProperties } from 'react';

export interface PlaceholderProps {
	/** Mono caps caption describing the missing image, e.g. "IMAGE – PCB TOP VIEW". */
	label?: string;
	/** CSS aspect-ratio (e.g. "16/9"). Omit to fill the positioned parent. */
	ratio?: string;
	style?: CSSProperties;
	className?: string;
}

export function Placeholder({ label = 'Image', ratio, style, className = '' }: PlaceholderProps) {
	const wrap: CSSProperties = ratio ? { position: 'relative', aspectRatio: ratio, ...style } : { position: 'absolute', inset: 0, ...style };
	return (
		<div className={className} style={wrap}>
			<div className="ee-placeholder">{label}</div>
		</div>
	);
}
