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
  title: {
    default: 'Zalada | Premium Salad Bowls Delivered in Technopark, Trivandrum',
    template: '%s | Zalada',
  },
  description: 'Zalada offers premium, farm-fresh salad bowls delivered directly to Technopark and Sreekariyam, Trivandrum. Order via Swiggy or Zomato for healthy, delicious meals.',
  keywords: ['salads Trivandrum', 'healthy food Technopark', 'salad delivery Sreekariyam', 'Zalada', 'fresh salad bowls', 'healthy lunch delivery'],
  authors: [{ name: 'Zalada' }],
  creator: 'Zalada',
  publisher: 'Zalada',
  metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : new URL('https://zalada.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Zalada | Premium Salad Bowls Delivered in Trivandrum',
    description: 'Fresh, chef-crafted salad bowls delivered to your desk in Technopark, Trivandrum. Healthy eating made easy and delicious.',
    url: 'https://zalada.in',
    siteName: 'Zalada',
    images: [
      {
        url: '/menu/DSC02327.JPG.jpeg',
        width: 1200,
        height: 630,
        alt: 'Zalada - Premium Salad Bowls',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zalada | Premium Salad Bowls',
    description: 'Fresh, chef-crafted salad bowls delivered to your desk in Technopark, Trivandrum.',
    images: ['/menu/DSC02327.JPG.jpeg'],
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
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'Zalada',
  image: 'https://zalada.in/menu/DSC02327.JPG.jpeg',
  '@id': 'https://zalada.in',
  url: 'https://zalada.in',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Technopark',
    addressLocality: 'Trivandrum',
    addressRegion: 'KL',
    postalCode: '695581',
    addressCountry: 'IN'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 8.5581,
    longitude: 76.8816
  },
  servesCuisine: 'Salads, Healthy Food',
  priceRange: '₹₹',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '22:00'
    }
  ],
  menu: 'https://zalada.in/#menu',
  acceptsReservations: 'False'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${dmSans.variable} ${fraunces.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
