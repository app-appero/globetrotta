import { useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'

export function useAdminTheme() {
  useEffect(() => {
    let active = true
    let unsubscribe

    try {
      unsubscribe = onSnapshot(doc(getFirebaseDb(), 'content', 'site'), (snapshot) => {
        if (!active) return
        document.documentElement.dataset.theme = snapshot.data()?.theme === 'dark' ? 'dark' : 'light'
      }, () => {
        if (active) document.documentElement.dataset.theme = 'light'
      })
    } catch {
      document.documentElement.dataset.theme = 'light'
    }

    return () => {
      active = false
      unsubscribe?.()
    }
  }, [])
}
