import type { ReactNode } from 'react';

export interface SpecTableProps {
	/** [label, value] pairs. Labels render mono caps muted; values tabular. */
	rows: Array<[ReactNode, ReactNode]>;
	/** Optional caption above a strong rule. */
	caption?: string;
	className?: string;
}

export function SpecTable({ rows = [], caption, className = '' }: SpecTableProps) {
	return (
		<table className={'ee-spec ' + className}>
			{caption && <caption>{caption}</caption>}
			<tbody>
				{rows.map((r, i) => (
					<tr key={i}>
						<td>{r[0]}</td>
						<td>{r[1]}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
