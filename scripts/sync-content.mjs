// Legge Firestore (content/* e projects/*) e rigenera src/data/*.js e
// src/data/projects/*.js, così il sito pubblico (statico, senza dipendenze
// Firebase a runtime) riflette le modifiche fatte dal pannello /admin.
// Fa parte di `npm run publish` (sync-content + build + firebase deploy).
import { writeFile, readdir, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { getAdminDb } from './lib/firebaseAdmin.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = resolve(__dirname, '../src/data')
const projectsDir = resolve(dataDir, 'projects')

const HEADER =
  '// File generato automaticamente da `npm run sync-content` a partire da Firestore.\n' +
  '// Non modificare a mano: le modifiche vengono sovrascritte al prossimo sync.\n' +
  '// Per cambiare questo contenuto usa il pannello /admin.\n\n'

// Blocchi salvati su Firestore come { items: [...] } (i documenti Firestore
// devono essere mappe, non array), ma pubblicati come array per non dover
// toccare i componenti che già li consumano.
const ARRAY_WRAPPED_BLOCKS = new Set(['solutions', 'process'])

const CONTENT_BLOCK_IDS = [
  'site',
  'hero',
  'problems',
  'newBusiness',
  'mvpApproach',
  'solutions',
  'process',
  'techStack',
  'about',
  'finalCta',
  'contact',
]

function toDataFileSource(value) {
  return `${HEADER}const data = ${JSON.stringify(value, null, 2)}\n\nexport default data\n`
}

function toCamelCase(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase())
}

async function syncContentBlocks(db) {
  let count = 0
  for (const blockId of CONTENT_BLOCK_IDS) {
    const snapshot = await db.collection('content').doc(blockId).get()
    if (!snapshot.exists) {
      console.warn(`[sync-content] content/${blockId} non trovato in Firestore, salto (esegui prima npm run seed-content).`)
      continue
    }
    const data = snapshot.data()
    const value = ARRAY_WRAPPED_BLOCKS.has(blockId) ? (data.items ?? []) : data
    await writeFile(resolve(dataDir, `${blockId}.js`), toDataFileSource(value), 'utf-8')
    count += 1
  }
  console.log(`[sync-content] Rigenerati ${count} file in src/data/.`)
}

async function syncProjects(db) {
  const snapshot = await db.collection('projects').get()
  const projects = snapshot.docs.map((d) => d.data()).sort((a, b) => a.slug.localeCompare(b.slug))

  const existingFiles = await readdir(projectsDir)
  await Promise.all(
    existingFiles.filter((file) => file !== 'index.js').map((file) => unlink(resolve(projectsDir, file))),
  )

  const entries = projects.map((project) => ({ varName: toCamelCase(project.slug), project }))

  for (const { varName, project } of entries) {
    const source =
      `${HEADER}/** @type {import('../../types/project.js').ProjectMetadata} */\n` +
      `const ${varName} = ${JSON.stringify(project, null, 2)}\n\nexport default ${varName}\n`
    await writeFile(resolve(projectsDir, `${project.slug}.js`), source, 'utf-8')
  }

  const imports = entries.map(({ varName, project }) => `import ${varName} from './${project.slug}.js'`).join('\n')
  const arrayItems = entries.map(({ varName }) => varName).join(', ')

  const indexSource = `${HEADER}${imports}

/**
 * Registro centrale dei progetti, rigenerato da \`npm run sync-content\`.
 * @type {import('../../types/project.js').ProjectMetadata[]}
 */
const projects = [${arrayItems}]

const REQUIRED_FIELDS = ['slug', 'title', 'shortDescription', 'category', 'coverImage', 'seoTitle', 'seoDescription']

if (import.meta.env?.DEV) {
  const seenSlugs = new Set()
  for (const project of projects) {
    for (const field of REQUIRED_FIELDS) {
      if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) {
        console.warn(\`[data/projects] "\${project.id || '(id mancante)'}" ha il campo obbligatorio "\${field}" mancante o vuoto.\`)
      }
    }
    if (seenSlugs.has(project.slug)) {
      console.warn(\`[data/projects] slug duplicato: "\${project.slug}". Ogni progetto deve avere uno slug univoco.\`)
    }
    seenSlugs.add(project.slug)
  }
}

export function getAllProjects() {
  return projects
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured)
}

export function getProjectBySlug(slug) {
  return projects.find((project) => project.slug === slug)
}

export function getCategories() {
  const categories = new Set()
  for (const project of projects) {
    for (const category of project.category) {
      categories.add(category)
    }
  }
  return ['Tutti', ...Array.from(categories).sort()]
}

export function getRelatedProjects(project, limit = 2) {
  return projects
    .filter((p) => p.slug !== project.slug && p.category.some((c) => project.category.includes(c)))
    .slice(0, limit)
}
`

  await writeFile(resolve(projectsDir, 'index.js'), indexSource, 'utf-8')
  console.log(`[sync-content] Rigenerati ${projects.length} progetti in src/data/projects/.`)
}

const db = getAdminDb()
await syncContentBlocks(db)
await syncProjects(db)
