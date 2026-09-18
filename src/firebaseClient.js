import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const USE_EMULATORS = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true'

const firebaseConfig = USE_EMULATORS
  ? {
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
let db

function getFirebaseApp() {
  if (!app) app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
  return app
}

export function getFirebaseDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp())
    if (USE_EMULATORS) connectFirestoreEmulator(db, '127.0.0.1', 8080)
  }
  return db
}

export { USE_EMULATORS }
