import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import site from '../src/data/site.js'
import { SITEMAP_PATHS } from '../src/data/staticRoutes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')

const paths = SITEMAP_PATHS

const urlEntries = paths
  .map((path) => {
    const loc = `${site.url}${path}`
    const priority = path === '/' ? '1.0' : '0.7'
    return `  <url>\n    <loc>${loc}</loc>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`

await writeFile(resolve(distDir, 'sitemap.xml'), sitemap, 'utf-8')
console.log(`sitemap.xml generato con ${paths.length} url in dist/sitemap.xml`)
