import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-archivo',
})

export const metadata: Metadata = {
  title: 'LeadPath - Career and Leadership Network',
  description: 'Empowering careers, inspiring leaders. Discover, develop, and lead with LeadPath&apos;s career and leadership network.',
  generator: 'v0.app',
  keywords: ['career development', 'leadership', 'mentorship', 'entrepreneurship', 'professional growth'],
  openGraph: {
    title: 'LeadPath - Career and Leadership Network',
    description: 'Empowering careers, inspiring leaders. Discover, develop, and lead.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo.jpg-jfNx7MmRWvfEaLCtCLlEgp9A222wys.jpeg',
        width: 1200,
        height: 630,
        alt: 'LeadPath Logo',
      },
    ],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0b1f4b' },
    { media: '(prefers-color-scheme: dark)', color: '#081226' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

const themeInit = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.toggle('dark',d);c.toggle('light',!d);}catch(e){}})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="antialiased bg-background text-foreground font-sans transition-colors">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
