'use client';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ee';
import { THEME_KEY } from '@/lib/theme';


export function ThemeSwitch() {
	const [dark, setDark] = useState(false);
	useEffect(() => {
		setDark(document.documentElement.getAttribute('data-theme') === 'chassis');
	}, []);
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const next = e.target.checked;
		setDark(next);
		if (next) document.documentElement.setAttribute('data-theme', 'chassis');
		else document.documentElement.removeAttribute('data-theme');
		try {
			if (next) localStorage.setItem(THEME_KEY, 'chassis');
			else localStorage.removeItem(THEME_KEY);
		} catch {
			// Storage can be blocked; the switch still works for this page view.
		}
	};
	return (
		<div className="pf-theme">
			<Switch label={dark ? 'Dark' : 'Light'} checked={dark} onChange={onChange} aria-label="Dark theme" />
		</div>
	);
}
