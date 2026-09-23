// Sincronizza solo i blocchi editoriali da Firestore ai fallback statici.
// I progetti sono gestiti esclusivamente dalla collection Firestore "projects"
// e non vengono esportati in file JavaScript.
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { getAdminDb } from './lib/firebaseAdmin.mjs'

const dataDir = resolve(dirname(fileURLToPath(import.meta.url)), '../src/data')
const HEADER =
  '// File generato automaticamente da `npm run sync-content` a partire da Firestore.\n' +
  '// Per cambiare questo contenuto usa il pannello /admin.\n\n'
const ARRAY_WRAPPED_BLOCKS = new Set(['solutions', 'process'])
const CONTENT_BLOCK_IDS = [
  'site', 'hero', 'problems', 'newBusiness', 'mvpApproach', 'solutions',
  'process', 'techStack', 'about', 'finalCta', 'contact', 'privacy',
]

const db = getAdminDb()
let count = 0
for (const blockId of CONTENT_BLOCK_IDS) {
  const snapshot = await db.collection('content').doc(blockId).get()
  if (!snapshot.exists) {
    console.warn(`[sync-content] content/${blockId} non trovato, salto.`)
    continue
  }
  const data = snapshot.data()
  const value = ARRAY_WRAPPED_BLOCKS.has(blockId) ? (data.items ?? []) : data
  await writeFile(
    resolve(dataDir, `${blockId}.js`),
    `${HEADER}const data = ${JSON.stringify(value, null, 2)}\n\nexport default data\n`,
    'utf-8',
  )
  count += 1
}
console.log(`[sync-content] Rigenerati ${count} blocchi editoriali. I progetti restano in Firestore.`)
