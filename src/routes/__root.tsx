import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import appCss from '../styles/global.css?url'

/** URL di produzione (senza slash finale): unica fonte per canonical/OG/sitemap. */
export const SITE_URL = 'https://chiara-cat-sitter.netlify.app'

const SITE_NAME = 'Chiara · Cat Sitter a Firenze'
const TITLE = 'Chiara · Cat Sitter a Firenze'
const DESCRIPTION =
  'Chiara, cat sitter a Firenze: coccole professionali, croccantini puntuali, fusa garantite. Visite a domicilio, gioco, lettiera e medicine con dolcezza.'
const OG_IMAGE = `${SITE_URL}/og-image.png`
const CANONICAL = `${SITE_URL}/`

// NOTA: recapiti/zona di esempio, allineati a src/components/Contatti/Contatti.tsx
// e src/components/Zone/Zone.tsx. Sostituire con i dati reali di Chiara.
const BUSINESS = {
  telefono: '+39 055 123 4567',
  email: 'ciao@chiaracatsitter.it',
  citta: 'Firenze',
  regione: 'Toscana',
  lat: 43.7825,
  lon: 11.2516,
  zone: [
    'Firenze',
    'Soffiano',
    'Isolotto',
    'Legnaia',
    'Bagnese',
    'Casellina',
    'Scandicci',
    'San Frediano',
    'Porta Romana',
  ],
} as const

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: DESCRIPTION,
  url: CANONICAL,
  image: OG_IMAGE,
  telephone: BUSINESS.telefono,
  email: BUSINESS.email,
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.citta,
    addressRegion: BUSINESS.regione,
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.lat,
    longitude: BUSINESS.lon,
  },
  areaServed: BUSINESS.zone.map((name) => ({ '@type': 'City', name })),
  knowsLanguage: 'it',
}

const FAVICON =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='88'>🐾</text></svg>"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'author', content: 'Chiara' },
      { name: 'robots', content: 'index, follow' },
      { name: 'theme-color', content: '#FFD9E3' },
      // Geo (SEO locale)
      { name: 'geo.region', content: 'IT-52' },
      { name: 'geo.placename', content: 'Firenze' },
      { name: 'geo.position', content: `${BUSINESS.lat};${BUSINESS.lon}` },
      { name: 'ICBM', content: `${BUSINESS.lat}, ${BUSINESS.lon}` },
      // Open Graph
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: CANONICAL },
      { property: 'og:locale', content: 'it_IT' },
      { property: 'og:image', content: OG_IMAGE },
      { property: 'og:image:secure_url', content: OG_IMAGE },
      { property: 'og:image:type', content: 'image/png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      {
        property: 'og:image:alt',
        content: 'Chiara, cat sitter a Firenze, con un gattino in braccio',
      },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITLE },
      { name: 'twitter:description', content: DESCRIPTION },
      { name: 'twitter:image', content: OG_IMAGE },
      {
        name: 'twitter:image:alt',
        content: 'Chiara, cat sitter a Firenze, con un gattino in braccio',
      },
    ],
    links: [
      { rel: 'canonical', href: CANONICAL },
      { rel: 'icon', href: FAVICON },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Quicksand:wght@500;600;700&display=swap',
      },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(JSON_LD),
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
