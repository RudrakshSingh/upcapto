import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Etelios - Powering the Future of Retail & Enterprise IT',
  description: 'We don\'t just build software. We build the future of business efficiency. Enterprise-grade IT solutions with AI-first architecture.',
  keywords: 'enterprise IT, retail solutions, AI, cloud computing, business automation, Fortune 500',
  authors: [{ name: 'Etelios' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
