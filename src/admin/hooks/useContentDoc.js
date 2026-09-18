import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'

/** Get/set generico per un documento content/{blockId). */
export function useContentDoc(blockId) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    getDoc(doc(getFirebaseDb(), 'content', blockId))
      .then((snapshot) => {
        if (!cancelled) setData(snapshot.exists() ? snapshot.data() : {})
      })
      .catch((err) => {
        if (!cancelled) setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [blockId])

  const save = useCallback(
    async (nextData) => {
      await setDoc(doc(getFirebaseDb(), 'content', blockId), nextData)
      setData(nextData)
    },
    [blockId],
  )

  return { data, loading, error, save }
}
