import { Helmet } from 'react-helmet-async'
import { useContentBlock } from '../hooks/usePublicContent.jsx'
import { normalizeExternalUrl } from '../utils/externalUrl.js'

// Fallback letterale, non importato da src/data/site.js: quel file viene
// rigenerato interamente da `npm run sync-content` a partire da Firestore
// (vedi scripts/sync-content.mjs), che scrive solo `export default data` —
// un named export aggiunto qui a mano sparirebbe al prossimo sync.
const CONFIGURED_SITE_URL = 'https://globetrotta.com'

/**
 * Imposta title, meta description, canonical e Open Graph/Twitter card
 * per la pagina corrente. In build, vite-react-ssg serializza l'head
 * risultante nell'HTML statico di ogni rotta, così le anteprime social
 * (LinkedIn compreso) leggono i meta tag senza dover eseguire JavaScript.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
}) {
  const { data: site } = useContentBlock('site')
  const SITE_NAME = site.name
  const SITE_URL = site.url || CONFIGURED_SITE_URL
  const DEFAULT_IMAGE = `${SITE_URL}${site.assets?.ogImage || '/og-default.svg'}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`
  const absoluteImage = (image || DEFAULT_IMAGE).startsWith('http') ? image || DEFAULT_IMAGE : `${SITE_URL}${image || DEFAULT_IMAGE}`
  const structuredData = type === 'article'
    ? {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: title,
        description,
        url,
        image: absoluteImage,
        author: { '@type': 'Person', name: site.author, url: SITE_URL },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: site.author,
        jobTitle: site.role,
        url: SITE_URL,
        sameAs: [site.linkedinUrl, site.githubUrl].map(normalizeExternalUrl).filter(Boolean),
      }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:locale" content="it_IT" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
