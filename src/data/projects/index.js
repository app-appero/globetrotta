import oracleTennis from './oracleTennis.js'
import studioFlow from './studioFlow.js'
import docPilot from './docPilot.js'

/**
 * Registro centrale dei progetti. Per aggiungere un nuovo progetto:
 * 1. duplica uno dei file in questa cartella e compila i campi;
 * 2. importalo qui sopra;
 * 3. aggiungilo all'array `projects` qui sotto.
 * Nessun altro file va modificato: router, pagine e homepage leggono
 * sempre da questo modulo. Vedi README.md, sezione "Come aggiungere un nuovo progetto".
 * @type {import('../../types/project.js').ProjectMetadata[]}
 */
const projects = [oracleTennis, studioFlow, docPilot]

const REQUIRED_FIELDS = ['slug', 'title', 'shortDescription', 'category', 'coverImage', 'seoTitle', 'seoDescription']

if (import.meta.env?.DEV) {
  const seenSlugs = new Set()
  for (const project of projects) {
    for (const field of REQUIRED_FIELDS) {
      if (!project[field] || (Array.isArray(project[field]) && project[field].length === 0)) {
        console.warn(`[data/projects] "${project.id || '(id mancante)'}" ha il campo obbligatorio "${field}" mancante o vuoto.`)
      }
    }
    if (seenSlugs.has(project.slug)) {
      console.warn(`[data/projects] slug duplicato: "${project.slug}". Ogni progetto deve avere uno slug univoco.`)
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
