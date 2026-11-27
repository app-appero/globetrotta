import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getFirebaseDb } from './firebaseClient.js'
import { isNewContactRequest, isPendingPublicFeedback, showBrowserNotification, summarizeIncoming } from './inbox.js'

const InboxAlertsContext = createContext(null)

function watchCollection(collectionName, onDocs, onIdle) {
  const primed = { current: false }
  return onSnapshot(
    query(collection(getFirebaseDb(), collectionName), orderBy('createdAt', 'desc')),
    (snapshot) => {
      const docs = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
      onDocs(docs)
      if (!primed.current) {
        primed.current = true
        return
      }
      snapshot.docChanges().forEach((change) => {
        if (change.type !== 'added') return
        showBrowserNotification(summarizeIncoming(change.doc.data(), collectionName))
      })
    },
    () => {
      onIdle()
    },
  )
}

export function InboxAlertsProvider({ children }) {
  const [requests, setRequests] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [ready, setReady] = useState({ requests: false, testimonials: false })
  const [permission, setPermission] = useState(() => (
    typeof Notification === 'undefined' ? 'unsupported' : Notification.permission
  ))
  const titleRef = useRef(typeof document === 'undefined' ? '' : document.title)

  useEffect(() => {
    const unsubscribeRequests = watchCollection('contactRequests', (docs) => {
      setRequests(docs)
      setReady((current) => ({ ...current, requests: true }))
    }, () => setReady((current) => ({ ...current, requests: true })))
    const unsubscribeTestimonials = watchCollection('testimonials', (docs) => {
      setTestimonials(docs)
      setReady((current) => ({ ...current, testimonials: true }))
    }, () => setReady((current) => ({ ...current, testimonials: true })))
    return () => {
      unsubscribeRequests()
      unsubscribeTestimonials()
    }
  }, [])

  const newRequests = useMemo(
    () => requests.filter(isNewContactRequest).length,
    [requests],
  )
  const pendingFeedback = useMemo(
    () => testimonials.filter(isPendingPublicFeedback).length,
    [testimonials],
  )

  useEffect(() => {
    const previous = titleRef.current
    const total = newRequests + pendingFeedback
    document.title = total > 0 ? `(${total}) GlobeTrotta — Admin` : 'GlobeTrotta — Admin'
    return () => {
      document.title = previous
    }
  }, [newRequests, pendingFeedback])

  async function enableNotifications() {
    if (typeof Notification === 'undefined') return
    const result = await Notification.requestPermission()
    setPermission(result)
  }

  const value = {
    ready: ready.requests && ready.testimonials,
    newRequests,
    pendingFeedback,
    permission,
    enableNotifications,
  }

  return <InboxAlertsContext.Provider value={value}>{children}</InboxAlertsContext.Provider>
}

export function useInboxAlerts() {
  const value = useContext(InboxAlertsContext)
  if (!value) throw new Error('useInboxAlerts va usato dentro InboxAlertsProvider')
  return value
}
