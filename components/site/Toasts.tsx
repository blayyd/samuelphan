'use client';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { Toast } from '@/components/ee';

type ToastItem = { k: number; code: string; tone: 'ok' | 'error'; msg: ReactNode };
type ToastFn = (code: string, tone: 'ok' | 'error', msg: ReactNode) => void;

const ToastContext = createContext<ToastFn>(() => {});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<ToastItem[]>([]);
	const seq = useRef(0);
	const dismiss = useCallback((k: number) => setToasts((t) => t.filter((x) => x.k !== k)), []);
	const toast = useCallback<ToastFn>(
		(code, tone, msg) => {
			const k = ++seq.current;
			setToasts((t) => [...t, { k, code, tone, msg }]);
			setTimeout(() => dismiss(k), 3200);
		},
		[dismiss],
	);
	return (
		<ToastContext.Provider value={toast}>
			{children}
			<div className="ee-toast-stack" aria-live="polite">
				{toasts.map((t) => (
					<Toast key={t.k} code={t.code} tone={t.tone} onClose={() => dismiss(t.k)}>
						{t.msg}
					</Toast>
				))}
			</div>
		</ToastContext.Provider>
	);
}
