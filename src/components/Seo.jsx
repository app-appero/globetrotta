import { Helmet } from 'react-helmet-async'
import site from '../data/site.js'

const SITE_NAME = site.name
const SITE_URL = site.url
const DEFAULT_IMAGE = `${SITE_URL}/og-default.svg`

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
  image = DEFAULT_IMAGE,
  type = 'website',
}) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
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
    </Helmet>
  )
}
