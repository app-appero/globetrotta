import { useCallback, useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'
import { generateInvitationToken } from '../../utils/testimonials.js'

export function useTestimonialInvitations() {
  const [invitations, setInvitations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(getFirebaseDb(), 'testimonialInvitations'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        setInvitations(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
        setLoading(false)
      },
      (snapshotError) => {
        setError(snapshotError.message)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  const createInvitation = useCallback(async ({ projectId, projectName, clientName, expiresAt }) => {
    const token = generateInvitationToken()
    await setDoc(doc(getFirebaseDb(), 'testimonialInvitations', token), {
      projectId: projectId || '',
      projectName: projectName || '',
      clientName: clientName || '',
      used: false,
      active: true,
      expiresAt: expiresAt || null,
      createdAt: serverTimestamp(),
    })
    return token
  }, [])

  const setInvitationActive = useCallback(async (token, active) => {
    await updateDoc(doc(getFirebaseDb(), 'testimonialInvitations', token), { active })
  }, [])

  const removeInvitation = useCallback(async (token) => {
    await deleteDoc(doc(getFirebaseDb(), 'testimonialInvitations', token))
  }, [])

  return { invitations, loading, error, createInvitation, setInvitationActive, removeInvitation }
}
