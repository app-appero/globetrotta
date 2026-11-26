export function isNewContactRequest(request) {
  return (request?.status || 'new') === 'new'
}

export function isPendingPublicFeedback(testimonial) {
  return testimonial?.status === 'pending' && testimonial?.source === 'feedback-form'
}

function personName(value, fallback) {
  const name = String(value ?? '').replace(/[\u0000-\u001F\u007F]+/g, ' ').replace(/\s+/g, ' ').trim()
  return name || fallback
}

export function summarizeIncoming(data, collectionName) {
  if (collectionName === 'contactRequests' && isNewContactRequest(data)) {
    const name = personName(data?.name, 'Qualcuno')
    return {
      title: 'Nuova richiesta di lavoro',
      body: `${name} ha inviato una richiesta dal sito.`,
      href: '/admin/richieste',
    }
  }

  if (collectionName === 'testimonials' && isPendingPublicFeedback(data)) {
    const name = personName(data?.clientName, 'Un cliente')
    return {
      title: 'Nuovo feedback',
      body: `${name} ha lasciato un feedback da verificare.`,
      href: '/admin/testimonianze',
    }
  }

  return null
}

export function showBrowserNotification(summary) {
  if (typeof Notification === 'undefined' || Notification.permission !== 'granted' || !summary) return false
  try {
    const notification = new Notification(summary.title, {
      body: summary.body,
      tag: `${summary.href}-${Date.now()}`,
    })
    notification.onclick = () => {
      window.focus()
      window.location.assign(summary.href)
      notification.close()
    }
    return true
  } catch {
    return false
  }
}
