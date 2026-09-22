import { useCallback, useEffect, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'
import { fallbackContent } from '../../data/publicFallback.js'

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
        if (!cancelled) {
          const savedData = snapshot.exists() ? snapshot.data() : {}
          const fallbackData = fallbackContent[blockId] || {}
          setData({
            ...fallbackData,
            ...savedData,
            ...(blockId === 'privacy' && (!savedData.sections || savedData.sections.length === 0)
              ? { sections: fallbackData.sections }
              : {}),
          })
        }
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

  return { data: data ?? {}, loading, error, save }
}
