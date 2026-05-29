import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: "Zalada | Premium Salad Bowls And India's First Smart Salad Vending Machine",
    template: '%s | Zalada',
  },
  description:
    "Zalada offers premium farm-fresh salad bowls in Trivandrum and India's first smart ready-to-eat salad vending machine, now available in Trivandrum, Kerala. Order via Swiggy or Zomato.",
  keywords: [
    'salads Trivandrum',
    'healthy food Technopark',
    'salad delivery Sreekariyam',
    'India first smart salad vending machine',
    'salad vending machine Trivandrum Kerala',
    'ready to eat salad vending machine',
    'Zalada',
    'fresh salad bowls',
    'healthy lunch delivery',
  ],
  authors: [{ name: 'Zalada' }],
  creator: 'Zalada',
  publisher: 'Zalada',
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : new URL('https://zalada.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Zalada | Salad Bowls And India's First Smart Salad Vending Machine",
    description:
      "Fresh chef-crafted salad bowls in Trivandrum, plus India's first smart ready-to-eat salad vending machine, now in Trivandrum, Kerala.",
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
    title: "Zalada | Salad Bowls And India's First Smart Salad Vending Machine",
    description:
      "Fresh salad bowls in Trivandrum and India's first smart ready-to-eat salad vending machine, now in Trivandrum, Kerala.",
    images: ['/menu/DSC02327.JPG.jpeg'],
  },
  icons: {
    icon: [
      { url: '/zalada_logo.jpg' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/zalada_logo.jpg',
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
  description:
    "Premium salad bowls in Trivandrum and India's first smart ready-to-eat salad vending machine, now available in Trivandrum, Kerala.",
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Technopark',
    addressLocality: 'Trivandrum',
    addressRegion: 'KL',
    postalCode: '695581',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 8.5581,
    longitude: 76.8816,
  },
  servesCuisine: 'Salads, Healthy Food',
  priceRange: 'INR 200-400',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Ready To Eat Salad Vending Machine',
    itemListElement: [
      {
        '@type': 'Offer',
        name: "India's First Smart Salad Vending Machine",
        description:
          'Ready-to-eat smart salad vending available in Trivandrum, Kerala.',
        areaServed: 'Trivandrum, Kerala',
      },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '22:00',
    },
  ],
  menu: 'https://zalada.in/#menu',
  acceptsReservations: 'False',
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
