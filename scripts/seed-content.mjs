// One-shot: carica in Firestore i contenuti attualmente presenti in
// src/data/*.js, così il pannello /admin si apre già popolato con i testi
// reali del sito invece che con form vuoti. Esegui una sola volta dopo aver
// configurato Firebase (npm run seed-content); i salvataggi successivi
// avvengono dal pannello stesso.
import { getAdminDb } from './lib/firebaseAdmin.mjs'

import site from '../src/data/site.js'
import hero from '../src/data/hero.js'
import problems from '../src/data/problems.js'
import newBusiness from '../src/data/newBusiness.js'
import mvpApproach from '../src/data/mvpApproach.js'
import solutions from '../src/data/solutions.js'
import processSteps from '../src/data/process.js'
import techStack from '../src/data/techStack.js'
import about from '../src/data/about.js'
import finalCta from '../src/data/finalCta.js'
import contact from '../src/data/contact.js'
import { getAllProjects } from '../src/data/projects/index.js'

const ARRAY_WRAPPED_BLOCKS = new Set(['solutions', 'process'])

const CONTENT_BLOCKS = {
  site,
  hero,
  problems,
  newBusiness,
  mvpApproach,
  solutions,
  process: processSteps,
  techStack,
  about,
  finalCta,
  contact,
}

const db = getAdminDb()

for (const [blockId, value] of Object.entries(CONTENT_BLOCKS)) {
  const docValue = ARRAY_WRAPPED_BLOCKS.has(blockId) ? { items: value } : value
  await db.collection('content').doc(blockId).set(docValue)
  console.log(`[seed-content] content/${blockId} scritto.`)
}

for (const project of getAllProjects()) {
  await db.collection('projects').doc(project.slug).set(project)
  console.log(`[seed-content] projects/${project.slug} scritto.`)
}

console.log('\n[seed-content] Fatto. Apri /admin (npm run dev) per vedere i contenuti già popolati.')
