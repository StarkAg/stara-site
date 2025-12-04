import '../styles/globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import CursorFollower from '@/components/CursorFollower'
import Header from '@/components/Header'

export const metadata = {
  title: 'Stara — Premium Doors by Stara, Craft',
  description: 'Premium interior and exterior doors by Stara. Hand-finished veneers, engineered cores, custom sizes and pro installation. Find a dealer or request a quote.',
  keywords: ['doors', 'crafted doors', 'custom doors', 'Stara', 'premium doors', 'handcrafted'],
  authors: [{ name: 'Stara' }],
  creator: 'Stara',
  publisher: 'Stara',
  
  // OpenGraph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stara.com', // TODO: Replace with actual domain
    siteName: 'Stara',
    title: 'Stara — Doors by Stara, Craft',
    description: 'Doors that craft a moment. Explore modern, heritage and weather-resistant collections. Dealer locator, custom orders & technical specs.',
    images: [
      {
        url: '/assets/og-stara.jpg',
        width: 1200,
        height: 630,
        alt: 'Stara — Doors by Stara, Craft',
      },
    ],
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Stara — Doors by Stara, Craft',
    description: 'Doors that craft a moment. Explore modern, heritage and weather-resistant collections. Dealer locator, custom orders & technical specs.',
    images: ['/assets/images/og-stara.jpg'],
    creator: '@stara', // TODO: Replace with actual Twitter handle
  },

  // Canonical URL
  alternates: {
    canonical: 'https://stara.com', // TODO: Replace with actual domain
  },

  // Robots
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

// Viewport (exported separately in Next.js 15+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0b0b0b',
}

// Structured JSON-LD data for organization
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stara, Craft',
  url: 'https://your-stara-site.com', // TODO: Replace with actual domain
  logo: 'https://your-stara-site.com/assets/logo-stara.png', // TODO: Replace with actual logo URL
  sameAs: [],
  contactPoint: [{
    '@type': 'ContactPoint',
    telephone: '+91-XXXXXXXXXX', // TODO: Replace with actual phone number
    contactType: 'customer service',
    areaServed: 'IN', // TODO: Replace with actual area served
  }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Inter font loaded via CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* Preload critical hero assets for faster LCP */}
        <link rel="preload" as="image" href="/assets/hero-1.jpg" />
        <link rel="preload" as="image" href="/assets/hero-video-frame.jpg" />
      </head>
      <body className="font-sans">
        <SmoothScroll>
          <CursorFollower />
          {/* Structured JSON-LD Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationSchema),
            }}
          />
          <Header />
          <main>
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  )
}
