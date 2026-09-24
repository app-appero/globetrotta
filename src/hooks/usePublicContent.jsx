import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { getFirebaseDb } from '../firebaseClient.js'
import { fallbackContent } from '../data/publicFallback.js'
import { sortProjects } from '../utils/projectPresentation.js'
import { sortTestimonials } from '../utils/testimonials.js'

const PublicContentContext = createContext(null)
const REMOVED_PROJECT_SLUGS = new Set(['oracle-tennis', 'studio-flow', 'doc-pilot'])

function isPublicProject(project) {
  return project.status !== 'draft'
}

export function PublicContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent)
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryToken, setRetryToken] = useState(0)

  const retry = useCallback(() => {
    setError('')
    setLoading(true)
    setRetryToken((token) => token + 1)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = content.site?.theme === 'dark' ? 'dark' : 'light'
  }, [content.site?.theme])

  useEffect(() => {
    let contentReady = false
    let projectsReady = false
    let testimonialsReady = false
    let active = true
    let unsubscribeContent
    let unsubscribeProjects
    let unsubscribeTestimonials

    function maybeStopLoading() {
      if (contentReady && projectsReady && testimonialsReady) setLoading(false)
    }

    try {
      const db = getFirebaseDb()
      unsubscribeContent = onSnapshot(collection(db, 'content'), (snapshot) => {
        if (!active) return
        const next = { ...fallbackContent }
        snapshot.docs.forEach((document) => {
          // La Hero pubblicata deriva dai file versionati e dalla build verificata.
          // Evita che un documento Firestore precedente reintroduca testi diversi
          // dopo l'hydration.
          if (document.id === 'hero') return
          next[document.id] = document.data()
        })
        setContent(next)
        contentReady = true
        maybeStopLoading()
      }, (snapshotError) => {
        if (!active) return
        setError(snapshotError.message)
        contentReady = true
        maybeStopLoading()
      })
      unsubscribeProjects = onSnapshot(query(collection(db, 'projects'), where('status', '!=', 'draft')), (snapshot) => {
        if (!active) return
        const firestoreProjects = snapshot.docs.filter((document) => {
          const data = document.data()
          return !REMOVED_PROJECT_SLUGS.has(data.slug || document.id)
        }).map((document) => {
          const data = document.data()
          return { ...data, id: document.id }
        })
        setProjects(sortProjects(firestoreProjects.filter(isPublicProject)))
        projectsReady = true
        maybeStopLoading()
      }, (snapshotError) => {
        if (!active) return
        setError(snapshotError.message)
        projectsReady = true
        maybeStopLoading()
      })
      // Il sito pubblico può leggere solo le testimonianze approvate (vedi
      // firestore.rules): questo filtro non è un'ottimizzazione, è l'unica
      // query che le regole di sicurezza permettono a un visitatore anonimo.
      unsubscribeTestimonials = onSnapshot(query(collection(db, 'testimonials'), where('status', '==', 'approved')), (snapshot) => {
        if (!active) return
        setTestimonials(sortTestimonials(snapshot.docs.map((document) => ({ ...document.data(), id: document.id }))))
        testimonialsReady = true
        maybeStopLoading()
      }, (snapshotError) => {
        if (!active) return
        setError(snapshotError.message)
        testimonialsReady = true
        maybeStopLoading()
      })
    } catch (initializationError) {
      setError(initializationError.message)
      setLoading(false)
    }

    return () => {
      active = false
      unsubscribeContent?.()
      unsubscribeProjects?.()
      unsubscribeTestimonials?.()
    }
  }, [retryToken])

  const value = useMemo(
    () => ({ content, projects, testimonials, loading, error, retry }),
    [content, projects, testimonials, loading, error, retry],
  )
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
