import './styles/tokens.css';
import './styles/bundle.css';
import './styles/site.css';
import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { ThemeSwitch } from '@/components/site/ThemeSwitch';
import { themeInitScript } from '@/lib/theme';
import { ToastProvider } from '@/components/site/Toasts';
import { siteConfig } from '@/data/site-config';

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: { default: 'samuel phan', template: '%s · samuel phan' },
	description: siteConfig.description,
	authors: [{ name: siteConfig.name }],
	openGraph: {
		type: 'website',
		siteName: 'samuel phan',
		locale: 'en_US',
		images: [{ url: siteConfig.photo, width: 1152, height: 1536, alt: 'Samuel Phan' }],
	},
	twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body>
				<a href="#main" className="pf-skip">
					skip to content
				</a>
				<ToastProvider>
					<Header />
					{children}
					<Footer />
					<ThemeSwitch />
				</ToastProvider>
				<Analytics />
			</body>
		</html>
	);
}
