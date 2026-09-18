import { useCallback, useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'

export function useProjectsList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    const snapshot = await getDocs(collection(getFirebaseDb(), 'projects'))
    setProjects(snapshot.docs.map((d) => d.data()))
    setLoading(false)
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { projects, loading, reload }
}

export async function getProject(id) {
  const snapshot = await getDoc(doc(getFirebaseDb(), 'projects', id))
  return snapshot.exists() ? snapshot.data() : null
}

export async function saveProject(id, data) {
  await setDoc(doc(getFirebaseDb(), 'projects', id), data)
}

export async function deleteProject(id) {
  await deleteDoc(doc(getFirebaseDb(), 'projects', id))
}
