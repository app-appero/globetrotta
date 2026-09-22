import { useCallback, useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query, updateDoc, doc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'

export function useContactRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(getFirebaseDb(), 'contactRequests'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setRequests(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
        setLoading(false)
      },
      (snapshotError) => {
        setError(snapshotError.message)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  const updateStatus = useCallback(async (requestId, status) => {
    await updateDoc(doc(getFirebaseDb(), 'contactRequests', requestId), { status })
  }, [])

  return { requests, loading, error, updateStatus }
}
