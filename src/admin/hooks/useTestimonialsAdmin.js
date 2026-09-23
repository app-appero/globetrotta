import { useCallback, useEffect, useState } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'

export function useTestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(getFirebaseDb(), 'testimonials'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setTestimonials(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
        setLoading(false)
      },
      (snapshotError) => {
        setError(snapshotError.message)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  const updateTestimonial = useCallback(async (id, patch) => {
    await updateDoc(doc(getFirebaseDb(), 'testimonials', id), { ...patch, updatedAt: serverTimestamp() })
  }, [])

  const createTestimonial = useCallback(async (data) => {
    await addDoc(collection(getFirebaseDb(), 'testimonials'), {
      ...data,
      source: 'admin',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }, [])

  const removeTestimonial = useCallback(async (id) => {
    await deleteDoc(doc(getFirebaseDb(), 'testimonials', id))
  }, [])

  return { testimonials, loading, error, updateTestimonial, createTestimonial, removeTestimonial }
}
