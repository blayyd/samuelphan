'use client';

import { useEffect, useRef } from 'react';
import type { MotionValue } from 'framer-motion';

import {
	COMPOSITE_COLOR,
	HARMONICS,
	PERIODS_ON_SCREEN,
	clamp,
	harmonicValue,
	lerp,
	maxCompositeAmp,
	smoothstep,
	type Harmonic,
} from '@/lib/fourier';

type FourierWaveformProps = {
	progress: MotionValue<number>;
};

const TIME_SPEED = 0.055;
const MAX_DPR = 2;
const DESKTOP_SAMPLES = 768;
const MOBILE_SAMPLES = 256;
const MOBILE_HARMONIC_COUNT = 5;

export function FourierWaveform({ progress }: FourierWaveformProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const progressRef = { current: progress.get() };
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.matchMedia('(max-width: 768px)').matches;
		const harmonics = isMobile ? HARMONICS.slice(0, MOBILE_HARMONIC_COUNT) : HARMONICS;
		const sampleCount = isMobile ? MOBILE_SAMPLES : DESKTOP_SAMPLES;
		const maxAmp = maxCompositeAmp(harmonics);
		const start = performance.now();
		const xs = new Float32Array(sampleCount);
		const compositeYs = new Float32Array(sampleCount);
		const harmonicYs = harmonics.map(() => new Float32Array(sampleCount));

		let width = 0;
		let height = 0;
		let running = true;
		let visible = true;
		let rafId = 0;

		const resize = () => {
			const parent = canvas.parentElement;
			const nextWidth = parent?.clientWidth ?? canvas.clientWidth;
			const nextHeight = parent?.clientHeight ?? canvas.clientHeight;
			if (nextWidth <= 0 || nextHeight <= 0) return;

			width = nextWidth;
			height = nextHeight;
			const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
			canvas.width = Math.floor(width * dpr);
			canvas.height = Math.floor(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};

		const drawStroke = (
			xCoords: Float32Array,
			yCoords: Float32Array,
			color: string,
			alpha: number,
			lineWidth: number,
			glow: boolean
		) => {
			if (alpha <= 0.01) return;
			ctx.save();
			ctx.globalAlpha = alpha;
			ctx.strokeStyle = color;
			ctx.lineWidth = lineWidth;
			ctx.lineJoin = 'round';
			ctx.lineCap = 'round';
			if (glow && !isMobile) {
				ctx.shadowColor = color;
				ctx.shadowBlur = 14;
			}
			ctx.beginPath();
			ctx.moveTo(xCoords[0], yCoords[0]);
			for (let i = 1; i < sampleCount; i++) {
				ctx.lineTo(xCoords[i], yCoords[i]);
			}
			ctx.stroke();
			ctx.restore();
		};

		const drawBaselines = (
			bases: number[],
			left: number,
			right: number,
			alpha: number
		) => {
			if (alpha <= 0.01) return;
			ctx.save();
			ctx.globalAlpha = alpha * 0.35;
			ctx.strokeStyle = 'rgba(168, 85, 247, 0.35)';
			ctx.lineWidth = 1;
			ctx.setLineDash([3, 7]);
			for (let i = 0; i < bases.length; i++) {
				ctx.beginPath();
				ctx.moveTo(left, bases[i]);
				ctx.lineTo(right, bases[i]);
				ctx.stroke();
			}
			ctx.restore();
		};

		const drawLabels = (
			items: Harmonic[],
			bases: number[],
			left: number,
			alpha: number
		) => {
			if (alpha <= 0.01) return;
			ctx.save();
			ctx.globalAlpha = alpha;
			ctx.font = '500 11px Inter, system-ui, sans-serif';
			ctx.textBaseline = 'bottom';
			ctx.textAlign = 'left';
			for (let i = 0; i < items.length; i++) {
				ctx.fillStyle = items[i].color;
				ctx.fillText(items[i].label, left, bases[i] - 6);
			}
			ctx.restore();
		};

		const drawSpectrum = (
			items: Harmonic[],
			plotX: number,
			plotY: number,
			plotW: number,
			plotH: number,
			alpha: number,
			grow: number
		) => {
			if (alpha <= 0.01) return;
			const maxK = items[items.length - 1].k;
			const ampMax = items[0].amp;
			const byK = new Map(items.map((h) => [h.k, h]));
			const slots = maxK;
			const gap = 3;
			const barW = Math.max(3, (plotW - gap * (slots - 1)) / slots);

			ctx.save();
			ctx.globalAlpha = alpha;

			ctx.strokeStyle = 'rgba(161, 161, 170, 0.35)';
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(plotX, plotY);
			ctx.lineTo(plotX, plotY + plotH);
			ctx.lineTo(plotX + plotW, plotY + plotH);
			ctx.stroke();

			for (let k = 1; k <= slots; k++) {
				const h = byK.get(k);
				const x = plotX + (k - 1) * (barW + gap);
				if (!h) continue;
				const barH = (h.amp / ampMax) * plotH * grow;
				ctx.fillStyle = h.color;
				ctx.globalAlpha = alpha * 0.9;
				ctx.fillRect(x, plotY + plotH - barH, barW, barH);
			}
			ctx.restore();
		};

		const paint = (time: number, p: number) => {
			if (width <= 0 || height <= 0) return;

			// Finish the split in the first half of the sticky range so About
			// can ride in over a held harmonic stack instead of empty space.
			const peel = smoothstep(0.12, 0.52, p);
			const compositeAlpha = 1 - smoothstep(0.08, 0.26, p);
			const harmonicAlpha = smoothstep(0.08, 0.26, p) * 0.92;
			const labelAlpha = smoothstep(0.28, 0.45, p);
			const spectrumAlpha = smoothstep(0.32, 0.5, p);
			const spectrumGrow = smoothstep(0.3, 0.52, p);

			const spectrumW = isMobile ? 0 : lerp(0, 132, spectrumAlpha);
			const labelX = isMobile ? 10 : 16;
			const left = isMobile ? 36 : 56;
			const right = width - 28 - spectrumW;
			const waveW = Math.max(40, right - left);

			const bandCenter = lerp(height * 0.72, height * 0.7, peel);
			const bandHeight = lerp(height * 0.32, height * 0.5, peel);
			const scale = (bandHeight * 0.38) / maxAmp;
			const n = harmonics.length;
			const lane = n > 1 ? bandHeight / n : bandHeight;

			ctx.clearRect(0, 0, width, height);

			const bases: number[] = [];
			for (let i = 0; i < n; i++) {
				const stacked = bandCenter + (i - (n - 1) / 2) * lane;
				bases.push(lerp(bandCenter, stacked, peel));
			}

			drawBaselines(bases, left, right, labelAlpha);

			for (let i = 0; i < sampleCount; i++) {
				const t = i / (sampleCount - 1);
				xs[i] = left + t * waveW;
				const xNorm = t * PERIODS_ON_SCREEN;
				let sum = 0;
				for (let h = 0; h < n; h++) {
					const value = harmonicValue(harmonics[h], xNorm, time);
					sum += value;
					if (harmonicAlpha > 0.01) {
						harmonicYs[h][i] = bases[h] - value * scale;
					}
				}
				if (compositeAlpha > 0.01) {
					compositeYs[i] = bandCenter - sum * scale;
				}
			}

			if (compositeAlpha > 0.01) {
				drawStroke(xs, compositeYs, COMPOSITE_COLOR, compositeAlpha * 0.85, 2.4, true);
				drawStroke(xs, compositeYs, '#f5f3ff', compositeAlpha * 0.55, 1.1, false);
			}

			if (harmonicAlpha > 0.01) {
				for (let h = 0; h < n; h++) {
					drawStroke(
						xs,
						harmonicYs[h],
						harmonics[h].color,
						harmonicAlpha,
						h === 0 ? 1.8 : 1.35,
						h < 3
					);
				}
				drawLabels(harmonics, bases, labelX, labelAlpha);
			}

			if (!isMobile && spectrumW > 8) {
				const plotH = Math.min(height * 0.32, bandHeight * 0.9);
				drawSpectrum(
					harmonics,
					width - spectrumW - 16,
					bandCenter - plotH / 2,
					spectrumW - 8,
					plotH,
					spectrumAlpha,
					spectrumGrow
				);
			}
		};

		const timeAt = () =>
			reducedMotion ? 0 : ((performance.now() - start) / 1000) * TIME_SPEED;

		const tick = () => {
			rafId = 0;
			if (!running || !visible || document.hidden) return;
			paint(timeAt(), clamp(progressRef.current, 0, 1));
			if (!reducedMotion) {
				rafId = requestAnimationFrame(tick);
			}
		};

		const ensureLoop = () => {
			if (!running || !visible || document.hidden) return;
			if (reducedMotion) {
				paint(0, clamp(progressRef.current, 0, 1));
				return;
			}
			if (!rafId) rafId = requestAnimationFrame(tick);
		};

		resize();
		ensureLoop();

		const unsubscribe = progress.on('change', (value) => {
			progressRef.current = value;
			if (reducedMotion) paint(0, clamp(value, 0, 1));
		});

		const io = new IntersectionObserver(
			([entry]) => {
				visible = entry.isIntersecting && entry.intersectionRatio > 0;
				if (visible) ensureLoop();
			},
			{ threshold: 0 }
		);
		io.observe(canvas);

		const onVisibility = () => {
			if (!document.hidden) ensureLoop();
		};
		document.addEventListener('visibilitychange', onVisibility);

		const ro = new ResizeObserver(() => {
			resize();
			if (reducedMotion || !rafId) {
				paint(timeAt(), clamp(progressRef.current, 0, 1));
			}
		});
		ro.observe(canvas.parentElement ?? canvas);

		return () => {
			running = false;
			if (rafId) cancelAnimationFrame(rafId);
			unsubscribe();
			io.disconnect();
			ro.disconnect();
			document.removeEventListener('visibilitychange', onVisibility);
		};
	}, [progress]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden
			className="pointer-events-none absolute inset-0 z-0 h-full w-full"
		/>
	);
}
