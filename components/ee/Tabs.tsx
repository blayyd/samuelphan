'use client';
import type { ReactNode } from 'react';

export interface TabItem {
	value: string;
	label: string;
	/** mono variant: count shown as a tiny LED number. */
	count?: number;
}

export interface TabsProps {
	tabs: Array<string | TabItem>;
	value: string;
	onChange?: (value: string) => void;
	/** mono = caps mono on a hairline with underline; text = large lowercase sans filter row, inactive items faint. */
	variant?: 'mono' | 'text';
	/** Right-aligned text, e.g. "04 projects". */
	aside?: ReactNode;
	className?: string;
	/** Optional id of the tabpanel the tabs control. */
	controls?: string;
}

export function Tabs({ tabs = [], value, onChange, variant = 'mono', aside, className = '', controls }: TabsProps) {
	return (
		<div className={'ee-tabs' + (variant === 'text' ? ' ee-tabs--text' : '') + ' ' + className} role="tablist">
			{tabs.map((t) => {
				const tab = typeof t === 'string' ? { value: t, label: t } : t;
				const sel = tab.value === value;
				return (
					<button
						key={tab.value}
						type="button"
						role="tab"
						aria-selected={sel}
						aria-controls={controls}
						className="ee-tab"
						onClick={() => onChange && onChange(tab.value)}
					>
						{tab.label}
						{variant !== 'text' && tab.count != null && <span className="ee-tab__count">{String(tab.count).padStart(2, '0')}</span>}
					</button>
				);
			})}
			{aside != null && <span className="ee-tabs__aside">{aside}</span>}
		</div>
	);
}
