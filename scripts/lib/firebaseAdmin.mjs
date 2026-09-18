import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const __dirname = dirname(fileURLToPath(import.meta.url))
const serviceAccountPath = resolve(__dirname, '../../serviceAccountKey.json')

/**
 * Client Firestore lato server (bypassa le security rules) per gli script di
 * seed/sync eseguiti manualmente da terminale.
 *
 * Se FIRESTORE_EMULATOR_HOST è impostata (automaticamente da
 * `firebase emulators:exec`, o a mano puntando a un'istanza di
 * `firebase emulators:start` già avviata) ci si collega al Firebase Local
 * Emulator Suite: non serve alcuna credenziale reale, basta un projectId.
 * Altrimenti serve una service account key locale — vedi README, sezione
 * "Pannello admin".
 */
export function getAdminDb() {
  const usingEmulator = Boolean(process.env.FIRESTORE_EMULATOR_HOST)

  if (!usingEmulator && !existsSync(serviceAccountPath)) {
    console.error(
      '\nManca serviceAccountKey.json nella root del progetto.\n' +
        'Generalo da Firebase Console > Project Settings > Service accounts > Generate new private key,\n' +
        'e salvalo come serviceAccountKey.json nella root del progetto (è già in .gitignore, non committarlo).\n' +
        'In alternativa, per testare in locale senza un progetto Firebase reale, usa gli emulatori\n' +
        '(vedi README, sezione "Testare in locale con gli emulatori Firebase").\n',
    )
    process.exit(1)
  }

  if (!getApps().length) {
    if (usingEmulator) {
      initializeApp({ projectId: process.env.GCLOUD_PROJECT || 'demo-globetrotta' })
    } else {
      const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))
      initializeApp({ credential: cert(serviceAccount) })
    }
  }

  return getFirestore()
}
