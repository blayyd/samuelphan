'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { IconButton } from './IconButton';

export interface DialogProps {
	open?: boolean;
	/** Mono caps title in the header strip. */
	title: string;
	onClose?: () => void;
	/** Buttons row. */
	footer?: ReactNode;
	/** Render without fixed scrim (for docs/previews). */
	inline?: boolean;
	children?: ReactNode;
	className?: string;
}

export function Dialog({ open = true, title, onClose, footer, inline = false, children, className = '' }: DialogProps) {
	const ref = useRef<HTMLDivElement>(null);
	const closeRef = useRef(onClose);
	closeRef.current = onClose;
	useEffect(() => {
		if (!open || inline) return;
		const prev = document.activeElement as HTMLElement | null;
		ref.current?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') closeRef.current?.();
		};
		window.addEventListener('keydown', onKey);
		return () => {
			window.removeEventListener('keydown', onKey);
			prev?.focus?.();
		};
	}, [open, inline]);
	if (!open) return null;
	const box = (
		<div
			ref={ref}
			tabIndex={-1}
			className={'ee-dialog ' + className}
			role="dialog"
			aria-modal={!inline}
			aria-label={title}
			onClick={(e) => e.stopPropagation()}
		>
			<div className="ee-dialog__head">
				<h2 className="ee-dialog__title">{title}</h2>
				{onClose && <IconButton icon="x" label="Close" size="sm" onClick={onClose} />}
			</div>
			<div className="ee-dialog__body">{children}</div>
			{footer && <div className="ee-dialog__foot">{footer}</div>}
		</div>
	);
	if (inline) return box;
	return (
		<div className="ee-dialog-scrim" onClick={onClose}>
			{box}
		</div>
	);
}
