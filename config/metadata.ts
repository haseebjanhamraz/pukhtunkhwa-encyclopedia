import { Metadata } from "next"
import { siteConfig } from "./site"

export const metadata: Metadata = {
  metadataBase: new URL('https://pukhtunkhwa.com'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Pukhtunkhwa', 'Khyber Pakhtunkhwa', 'Pakistan', 'Pakhtun', 'Pashtun', 'Culture', 'History', 'Tourism'],
  authors: [{ name: 'KP Cybers' }],
  creator: 'KP Cybers',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pukhtunkhwa.com',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
    creator: '@kpcybers',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google Search Console verification code
  },
} 