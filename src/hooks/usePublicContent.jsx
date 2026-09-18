import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'
import { fallbackContent, fallbackProjects } from '../data/publicFallback.js'

const PublicContentContext = createContext(null)

export function PublicContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent)
  const [projects, setProjects] = useState(fallbackProjects)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let contentReady = false
    let projectsReady = false
    let active = true
    let unsubscribeContent
    let unsubscribeProjects

    try {
      const db = getFirebaseDb()
      unsubscribeContent = onSnapshot(collection(db, 'content'), (snapshot) => {
        if (!active) return
        const next = { ...fallbackContent }
        snapshot.docs.forEach((document) => {
          next[document.id] = document.data()
        })
        setContent(next)
        contentReady = true
        if (projectsReady) setLoading(false)
      }, (snapshotError) => {
        if (!active) return
        setError(snapshotError.message)
        contentReady = true
        if (projectsReady) setLoading(false)
      })
      unsubscribeProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
        if (!active) return
        setProjects(snapshot.docs.map((document) => ({ id: document.id, ...document.data() })))
        projectsReady = true
        if (contentReady) setLoading(false)
      }, (snapshotError) => {
        if (!active) return
        setError(snapshotError.message)
        projectsReady = true
        if (contentReady) setLoading(false)
      })
    } catch (initializationError) {
      setError(initializationError.message)
      setLoading(false)
    }

    return () => {
      active = false
      unsubscribeContent?.()
      unsubscribeProjects?.()
    }
  }, [])

  const value = useMemo(() => ({ content, projects, loading, error }), [content, projects, loading, error])
  return <PublicContentContext.Provider value={value}>{children}</PublicContentContext.Provider>
}

export function usePublicContent() {
  const value = useContext(PublicContentContext)
  if (!value) throw new Error('usePublicContent must be used inside PublicContentProvider')
  return value
}

export function useContentBlock(blockId) {
  const { content, ...state } = usePublicContent()
  return { data: content[blockId] || fallbackContent[blockId] || {}, ...state }
}
