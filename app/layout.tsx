import { DM_Sans, Fraunces, Instrument_Serif } from 'next/font/google'
import './globals.css'

// Modern sans for body
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

// Organic serif for headers
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif-display',
  display: 'swap',
})

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Zalada | Fresh. Crafted. Delivered.',
  description: 'Premium salad bowls crafted with farm-fresh ingredients. Order yours today.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fraunces.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
