/*
 * Icon glyphs are a subset of Lucide (https://lucide.dev).
 * Lucide is licensed under the ISC License:
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2022 as part of Feather (MIT).
 * All other copyright (c) for Lucide are held by Lucide Contributors 2022.
 * Permission to use, copy, modify, and/or distribute this software for any purpose with or without
 * fee is hereby granted, provided that the above copyright notice and this permission notice appear
 * in all copies. THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES.
 */
import type { CSSProperties, SVGProps } from "react";

export type IconName =
	| "activity"
	| "arrow-down"
	| "arrow-left"
	| "arrow-right"
	| "arrow-up-right"
	| "audio-waveform"
	| "battery-medium"
	| "binary"
	| "cable"
	| "calendar"
	| "chevron-down"
	| "chevron-right"
	| "circle"
	| "circuit-board"
	| "cog"
	| "cpu"
	| "cuboid"
	| "download"
	| "external-link"
	| "file-text"
	| "folder"
	| "gauge"
	| "github"
	| "layers"
	| "linkedin"
	| "mail"
	| "map-pin"
	| "menu"
	| "microchip"
	| "minus"
	| "pause"
	| "play"
	| "plug"
	| "plus"
	| "power"
	| "radio-tower"
	| "radio"
	| "ruler"
	| "search"
	| "signal"
	| "sliders-horizontal"
	| "spline"
	| "square"
	| "sun"
	| "thermometer"
	| "triangle-alert"
	| "waves"
	| "wrench"
	| "x"
	| "zap";

const ICONS: Record<IconName, string> = {
	"activity": "<path d=\"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2\"></path>",
	"arrow-down": "<path d=\"M12 5v14\"></path><path d=\"m19 12-7 7-7-7\"></path>",
	"arrow-left": "<path d=\"m12 19-7-7 7-7\"></path><path d=\"M19 12H5\"></path>",
	"arrow-right": "<path d=\"M5 12h14\"></path><path d=\"m12 5 7 7-7 7\"></path>",
	"arrow-up-right": "<path d=\"M7 7h10v10\"></path><path d=\"M7 17 17 7\"></path>",
	"audio-waveform": "<path d=\"M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2\"></path>",
	"battery-medium": "<rect width=\"16\" height=\"10\" x=\"2\" y=\"7\" rx=\"2\" ry=\"2\"></rect><line x1=\"22\" x2=\"22\" y1=\"11\" y2=\"13\"></line><line x1=\"6\" x2=\"6\" y1=\"11\" y2=\"13\"></line><line x1=\"10\" x2=\"10\" y1=\"11\" y2=\"13\"></line>",
	"binary": "<rect x=\"14\" y=\"14\" width=\"4\" height=\"6\" rx=\"2\"></rect><rect x=\"6\" y=\"4\" width=\"4\" height=\"6\" rx=\"2\"></rect><path d=\"M6 20h4\"></path><path d=\"M14 10h4\"></path><path d=\"M6 14h2v6\"></path><path d=\"M14 4h2v6\"></path>",
	"cable": "<path d=\"M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1\"></path><path d=\"M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9\"></path><path d=\"M21 21v-2h-4\"></path><path d=\"M3 5h4V3\"></path><path d=\"M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3\"></path>",
	"calendar": "<path d=\"M8 2v4\"></path><path d=\"M16 2v4\"></path><rect width=\"18\" height=\"18\" x=\"3\" y=\"4\" rx=\"2\"></rect><path d=\"M3 10h18\"></path>",
	"chevron-down": "<path d=\"m6 9 6 6 6-6\"></path>",
	"chevron-right": "<path d=\"m9 18 6-6-6-6\"></path>",
	"circle": "<circle cx=\"12\" cy=\"12\" r=\"10\"></circle>",
	"circuit-board": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"></rect><path d=\"M11 9h4a2 2 0 0 0 2-2V3\"></path><circle cx=\"9\" cy=\"9\" r=\"2\"></circle><path d=\"M7 21v-4a2 2 0 0 1 2-2h4\"></path><circle cx=\"15\" cy=\"15\" r=\"2\"></circle>",
	"cog": "<path d=\"M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z\"></path><path d=\"M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z\"></path><path d=\"M12 2v2\"></path><path d=\"M12 22v-2\"></path><path d=\"m17 20.66-1-1.73\"></path><path d=\"M11 10.27 7 3.34\"></path><path d=\"m20.66 17-1.73-1\"></path><path d=\"m3.34 7 1.73 1\"></path><path d=\"M14 12h8\"></path><path d=\"M2 12h2\"></path><path d=\"m20.66 7-1.73 1\"></path><path d=\"m3.34 17 1.73-1\"></path><path d=\"m17 3.34-1 1.73\"></path><path d=\"m11 13.73-4 6.93\"></path>",
	"cpu": "<rect width=\"16\" height=\"16\" x=\"4\" y=\"4\" rx=\"2\"></rect><rect width=\"6\" height=\"6\" x=\"9\" y=\"9\" rx=\"1\"></rect><path d=\"M15 2v2\"></path><path d=\"M15 20v2\"></path><path d=\"M2 15h2\"></path><path d=\"M2 9h2\"></path><path d=\"M20 15h2\"></path><path d=\"M20 9h2\"></path><path d=\"M9 2v2\"></path><path d=\"M9 20v2\"></path>",
	"cuboid": "<path d=\"m21.12 6.4-6.05-4.06a2 2 0 0 0-2.17-.05L2.95 8.41a2 2 0 0 0-.95 1.7v5.82a2 2 0 0 0 .88 1.66l6.05 4.07a2 2 0 0 0 2.17.05l9.95-6.12a2 2 0 0 0 .95-1.7V8.06a2 2 0 0 0-.88-1.66Z\"></path><path d=\"M10 22v-8L2.25 9.15\"></path><path d=\"m10 14 11.77-6.87\"></path>",
	"download": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"></path><polyline points=\"7 10 12 15 17 10\"></polyline><line x1=\"12\" x2=\"12\" y1=\"15\" y2=\"3\"></line>",
	"external-link": "<path d=\"M15 3h6v6\"></path><path d=\"M10 14 21 3\"></path><path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path>",
	"file-text": "<path d=\"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z\"></path><path d=\"M14 2v4a2 2 0 0 0 2 2h4\"></path><path d=\"M10 9H8\"></path><path d=\"M16 13H8\"></path><path d=\"M16 17H8\"></path>",
	"folder": "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"></path>",
	"gauge": "<path d=\"m12 14 4-4\"></path><path d=\"M3.34 19a10 10 0 1 1 17.32 0\"></path>",
	"github": "<path d=\"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4\"></path><path d=\"M9 18c-4.51 2-5-2-7-2\"></path>",
	"layers": "<path d=\"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z\"></path><path d=\"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65\"></path><path d=\"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65\"></path>",
	"linkedin": "<path d=\"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z\"></path><rect width=\"4\" height=\"12\" x=\"2\" y=\"9\"></rect><circle cx=\"4\" cy=\"4\" r=\"2\"></circle>",
	"mail": "<rect width=\"20\" height=\"16\" x=\"2\" y=\"4\" rx=\"2\"></rect><path d=\"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7\"></path>",
	"map-pin": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>",
	"menu": "<line x1=\"4\" x2=\"20\" y1=\"12\" y2=\"12\"></line><line x1=\"4\" x2=\"20\" y1=\"6\" y2=\"6\"></line><line x1=\"4\" x2=\"20\" y1=\"18\" y2=\"18\"></line>",
	"microchip": "<path d=\"M18 12h2\"></path><path d=\"M18 16h2\"></path><path d=\"M18 20h2\"></path><path d=\"M18 4h2\"></path><path d=\"M18 8h2\"></path><path d=\"M4 12h2\"></path><path d=\"M4 16h2\"></path><path d=\"M4 20h2\"></path><path d=\"M4 4h2\"></path><path d=\"M4 8h2\"></path><path d=\"M8 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-1.5c-.276 0-.494.227-.562.495a2 2 0 0 1-3.876 0C9.994 2.227 9.776 2 9.5 2z\"></path>",
	"minus": "<path d=\"M5 12h14\"></path>",
	"pause": "<rect x=\"14\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"></rect><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"></rect>",
	"play": "<polygon points=\"6 3 20 12 6 21 6 3\"></polygon>",
	"plug": "<path d=\"M12 22v-5\"></path><path d=\"M9 8V2\"></path><path d=\"M15 8V2\"></path><path d=\"M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z\"></path>",
	"plus": "<path d=\"M5 12h14\"></path><path d=\"M12 5v14\"></path>",
	"power": "<path d=\"M12 2v10\"></path><path d=\"M18.4 6.6a9 9 0 1 1-12.77.04\"></path>",
	"radio-tower": "<path d=\"M4.9 16.1C1 12.2 1 5.8 4.9 1.9\"></path><path d=\"M7.8 4.7a6.14 6.14 0 0 0-.8 7.5\"></path><circle cx=\"12\" cy=\"9\" r=\"2\"></circle><path d=\"M16.2 4.8c2 2 2.26 5.11.8 7.47\"></path><path d=\"M19.1 1.9a9.96 9.96 0 0 1 0 14.1\"></path><path d=\"M9.5 18h5\"></path><path d=\"m8 22 4-11 4 11\"></path>",
	"radio": "<path d=\"M4.9 19.1C1 15.2 1 8.8 4.9 4.9\"></path><path d=\"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5\"></path><path d=\"M19.1 4.9C23 8.8 23 15.1 19.1 19\"></path>",
	"ruler": "<path d=\"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z\"></path><path d=\"m14.5 12.5 2-2\"></path><path d=\"m11.5 9.5 2-2\"></path><path d=\"m8.5 6.5 2-2\"></path><path d=\"m17.5 15.5 2-2\"></path>",
	"search": "<circle cx=\"11\" cy=\"11\" r=\"8\"></circle><path d=\"m21 21-4.3-4.3\"></path>",
	"signal": "<path d=\"M2 20h.01\"></path><path d=\"M7 20v-4\"></path><path d=\"M12 20v-8\"></path><path d=\"M17 20V8\"></path><path d=\"M22 4v16\"></path>",
	"sliders-horizontal": "<line x1=\"21\" x2=\"14\" y1=\"4\" y2=\"4\"></line><line x1=\"10\" x2=\"3\" y1=\"4\" y2=\"4\"></line><line x1=\"21\" x2=\"12\" y1=\"12\" y2=\"12\"></line><line x1=\"8\" x2=\"3\" y1=\"12\" y2=\"12\"></line><line x1=\"21\" x2=\"16\" y1=\"20\" y2=\"20\"></line><line x1=\"12\" x2=\"3\" y1=\"20\" y2=\"20\"></line><line x1=\"14\" x2=\"14\" y1=\"2\" y2=\"6\"></line><line x1=\"8\" x2=\"8\" y1=\"10\" y2=\"14\"></line><line x1=\"16\" x2=\"16\" y1=\"18\" y2=\"22\"></line>",
	"spline": "<circle cx=\"19\" cy=\"5\" r=\"2\"></circle><circle cx=\"5\" cy=\"19\" r=\"2\"></circle><path d=\"M5 17A12 12 0 0 1 17 5\"></path>",
	"square": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\"></rect>",
	"sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"></circle><path d=\"M12 2v2\"></path><path d=\"M12 20v2\"></path><path d=\"m4.93 4.93 1.41 1.41\"></path><path d=\"m17.66 17.66 1.41 1.41\"></path><path d=\"M2 12h2\"></path><path d=\"M20 12h2\"></path><path d=\"m6.34 17.66-1.41 1.41\"></path><path d=\"m19.07 4.93-1.41 1.41\"></path>",
	"thermometer": "<path d=\"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z\"></path>",
	"triangle-alert": "<path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"></path><path d=\"M12 9v4\"></path><path d=\"M12 17h.01\"></path>",
	"waves": "<path d=\"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1\"></path><path d=\"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1\"></path><path d=\"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1\"></path>",
	"wrench": "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\"></path>",
	"x": "<path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path>",
	"zap": "<path d=\"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z\"></path>",
};

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" })[c] as string);

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "stroke" | "color"> {
	/** Glyph name (Lucide subset). */
	name: IconName;
	/** Pixel size, default 20. */
	size?: number;
	/** Stroke width; 1.25 default — keep thin (1–1.5). */
	stroke?: number;
	color?: string;
	/** Accessible label; omit for decorative icons. */
	title?: string;
	className?: string;
	style?: CSSProperties;
}

export function Icon({ name, size = 20, stroke = 1.25, color = "currentColor", title, style, className = "", ...rest }: IconProps) {
	const inner = ICONS[name];
	if (!inner) return null;
	return (
		<svg
			className={"ee-icon " + className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke={color}
			strokeWidth={stroke}
			strokeLinecap="square"
			strokeLinejoin="miter"
			role={title ? "img" : "presentation"}
			aria-label={title}
			aria-hidden={title ? undefined : true}
			style={style}
			dangerouslySetInnerHTML={{ __html: (title ? "<title>" + escape(title) + "</title>" : "") + inner }}
			{...rest}
		/>
	);
}
