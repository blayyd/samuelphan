import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from './Icon';
import { Badge } from './Badge';
import { Placeholder } from './Placeholder';

export interface ProjectCardProps {
	variant?: 'store' | 'editorial';
	/** Project name. */
	title: string;
	/** store: one muted line under the name, e.g. "robotics · 2026". */
	subtitle?: string;
	/** editorial: tiny mono line above media, e.g. "2025" or "REV C". */
	eyebrow?: string;
	/** editorial: mono caps facts below title. */
	meta?: string[];
	/** Image URL; omitted → Placeholder. */
	image?: string;
	imageLabel?: string;
	/** CSS aspect-ratio of media. Default "4/3". */
	ratio?: string;
	/** object-fit for image: cover (photos) or contain (renders / product on white). */
	fit?: 'cover' | 'contain';
	/** Node overlaid top-left — usually a <Tag>. */
	overlay?: ReactNode;
	/** Text for a black pill badge top-right, e.g. "team lead". */
	badge?: string;
	/** Internal paths render as next/link. */
	href?: string;
	onClick?: () => void;
	className?: string;
	/** next/image `sizes` hint for local images. */
	sizes?: string;
	/** Load the image eagerly (above the fold). */
	priority?: boolean;
}

export function ProjectCard({
	variant = 'store',
	title,
	subtitle,
	eyebrow,
	meta = [],
	image,
	imageLabel,
	ratio = '4/3',
	fit = 'cover',
	overlay,
	badge,
	href,
	onClick,
	className = '',
	sizes = '(max-width: 900px) 100vw, (max-width: 1320px) 50vw, 33vw',
	priority = false,
}: ProjectCardProps) {
	const clickable = !!(href || onClick);
	const media = (
		<div className="ee-card__media">
			{image ? (
				image.startsWith('/') ? (
					<Image src={image} alt={title} fill sizes={sizes} priority={priority} style={{ objectFit: fit }} />
				) : (
					// eslint-disable-next-line @next/next/no-img-element
					<img src={image} alt={title} style={{ objectFit: fit }} />
				)
			) : (
				<Placeholder label={imageLabel || 'Image – ' + title} />
			)}
			{overlay && <div className="ee-card__overlay">{overlay}</div>}
			{badge && (
				<div className="ee-card__badge">
					<Badge variant="pill">{badge}</Badge>
				</div>
			)}
		</div>
	);
	const style = { '--card-ratio': ratio, cursor: clickable ? 'pointer' : undefined } as CSSProperties;
	const body =
		variant === 'store' ? (
			<>
				{media}
				<div className="ee-card__row">
					<div style={{ minWidth: 0 }}>
						<h3 className="ee-card__name">{title}</h3>
						{subtitle && <div className="ee-card__sub">{subtitle}</div>}
					</div>
					{clickable && (
						<span className="ee-card__plus">
							<Icon name="plus" size={22} stroke={1} />
						</span>
					)}
				</div>
			</>
		) : (
			<>
				<div className="ee-card__top">
					<span className="ee-micro">{eyebrow}</span>
					{clickable && <Icon name="arrow-up-right" size={18} stroke={1} />}
				</div>
				{media}
				<h3 className="ee-card__title">{title}</h3>
				{meta.length > 0 && (
					<div className="ee-card__meta">
						{meta.map((m, i) => (
							<span key={i}>{m}</span>
						))}
					</div>
				)}
			</>
		);
	const cls = 'ee-card' + (variant === 'store' ? ' ee-card--store' : '') + ' ' + className;
	if (href && href.startsWith('/')) {
		return (
			<Link className={cls} href={href} onClick={onClick} style={style}>
				{body}
			</Link>
		);
	}
	if (href) {
		return (
			<a className={cls} href={href} onClick={onClick} style={style}>
				{body}
			</a>
		);
	}
	return (
		<div className={cls} onClick={onClick} style={style}>
			{body}
		</div>
	);
}
