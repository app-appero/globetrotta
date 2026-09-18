import { initializeApp, getApps } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

// Con VITE_USE_FIREBASE_EMULATORS=true ci si connette al Firebase Local
// Emulator Suite (npm run emulators) invece che al progetto Firebase reale:
// basta un projectId, senza le altre chiavi. Vedi README, sezione
// "Testare in locale con gli emulatori Firebase".
const USE_EMULATORS = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true'

const firebaseConfig = USE_EMULATORS
  ? {
      // L'SDK richiede comunque un apiKey per inizializzarsi, anche se poi il
      // traffico Auth/Firestore/Storage viene reindirizzato all'emulatore e
      // questo valore non viene mai usato per autenticarsi davvero.
      apiKey: 'demo-api-key',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-globetrotta',
    }
  : {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }

let app
let auth
let db
let storage

/**
 * Inizializzazione lazy: nessuna chiamata Firebase avviene al caricamento del
 * modulo, solo quando uno di questi getter viene invocato (sempre da dentro
 * useEffect/handler nei componenti admin). Questo pannello è raggiungibile
 * solo via /admin, caricato con React.lazy — il sito pubblico non importa mai
 * questo file. Ogni servizio viene memoizzato per collegarsi all'emulatore
 * una sola volta (connect*Emulator lancia un errore se chiamato due volte).
 */
function getFirebaseApp() {
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  }
  return app
}

export function getFirebaseAuth() {
  if (!auth) {
    auth = getAuth(getFirebaseApp())
    if (USE_EMULATORS) connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  }
  return auth
}

export function getFirebaseDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp())
    if (USE_EMULATORS) connectFirestoreEmulator(db, '127.0.0.1', 8080)
  }
  return db
}

export function getFirebaseStorage() {
  if (!storage) {
    storage = getStorage(getFirebaseApp())
    if (USE_EMULATORS) connectStorageEmulator(storage, '127.0.0.1', 9199)
  }
  return storage
}
