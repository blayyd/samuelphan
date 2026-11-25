import type { ReactNode } from 'react';
import { IconButton } from './IconButton';

export interface ToastProps {
	/** Short 14-segment status code, uppercase, e.g. "OK", "ERR", "SENT". */
	code?: string;
	/** ok = green code, error = red code. */
	tone?: 'ok' | 'error';
	onClose?: () => void;
	children?: ReactNode;
	className?: string;
}

export function Toast({ code = 'OK', tone = 'ok', onClose, children, className = '' }: ToastProps) {
	return (
		<div className={'ee-toast ' + className} role="status">
			<span className={'ee-toast__code' + (tone === 'ok' ? ' ee-toast__code--ok' : '')}>{code}</span>
			<span className="ee-toast__msg">{children}</span>
			{onClose && <IconButton icon="x" label="Dismiss" size="sm" onClick={onClose} style={{ color: 'var(--white-led)' }} />}
		</div>
	);
}
