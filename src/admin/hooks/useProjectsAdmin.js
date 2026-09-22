import { useCallback, useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'

const REMOVED_PROJECT_SLUGS = new Set(['oracle-tennis', 'studio-flow', 'doc-pilot'])

export function useProjectsList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    const snapshot = await getDocs(collection(getFirebaseDb(), 'projects'))
    setProjects(snapshot.docs
      .filter((d) => !REMOVED_PROJECT_SLUGS.has(d.data().slug || d.id))
      .map((d) => d.data()))
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

export async function publishProject(id) {
  await updateDoc(doc(getFirebaseDb(), 'projects', id), { status: 'in-development' })
}

export async function updateProjectStatus(id, status) {
  await updateDoc(doc(getFirebaseDb(), 'projects', id), { status })
}

export async function updateProjectOrder(id, order) {
  await updateDoc(doc(getFirebaseDb(), 'projects', id), { order })
}
