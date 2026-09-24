// Etichette e helper condivisi per le testimonianze, centralizzati qui in
// modo che l'admin e il sito pubblico mostrino sempre lo stesso testo per
// gli stessi valori interni (che restano in inglese per non compromettere
// i dati già salvati in Firestore).
export const TESTIMONIAL_STATUS_LABELS = {
  pending: 'In attesa',
  approved: 'Pubblicata',
  rejected: 'Rifiutata',
}

export function getTestimonialStatusLabel(status) {
  return TESTIMONIAL_STATUS_LABELS[status] || 'Stato da definire'
}

export function isApprovedTestimonial(testimonial) {
  return testimonial?.status === 'approved'
}

export function isFeaturedTestimonial(testimonial) {
  return isApprovedTestimonial(testimonial) && testimonial?.featured === true
}

export function isProjectTestimonial(testimonial, projectId) {
  return (
    isApprovedTestimonial(testimonial) &&
    testimonial?.showOnProject === true &&
    Boolean(projectId) &&
    testimonial?.projectId === projectId
  )
}

export function sortTestimonials(list) {
  return [...list].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.displayOrder)) ? Number(a.displayOrder) : Number.MAX_SAFE_INTEGER
    const orderB = Number.isFinite(Number(b.displayOrder)) ? Number(b.displayOrder) : Number.MAX_SAFE_INTEGER
    return orderA - orderB || String(a.clientName || '').localeCompare(String(b.clientName || ''), 'it')
  })
}

function levenshteinDistance(a, b) {
  const m = a.length
  const n = b.length
  if (m === 0) return n
  if (n === 0) return m
  let previousRow = Array.from({ length: n + 1 }, (_, j) => j)
  for (let i = 1; i <= m; i += 1) {
    const currentRow = [i]
    for (let j = 1; j <= n; j += 1) {
      const substitutionCost = a[i - 1] === b[j - 1] ? 0 : 1
      currentRow[j] = Math.min(
        currentRow[j - 1] + 1,
        previousRow[j] + 1,
        previousRow[j - 1] + substitutionCost,
      )
    }
    previousRow = currentRow
  }
  return previousRow[n]
}

// Usata in admin per avvisare che una modifica al testo di una
// testimonianza è sostanziale (oltre il 20% dei caratteri cambiati) e
// potrebbe richiedere una nuova approvazione esplicita del cliente, invece
// di una semplice correzione ortografica.
export function isSubstantialEdit(original, edited) {
  const a = String(original || '').trim()
  const b = String(edited || '').trim()
  if (a === b) return false
  if (a.length === 0 || b.length === 0) return b.length > 0
  const distance = levenshteinDistance(a, b)
  const ratio = distance / Math.max(a.length, b.length)
  return ratio > 0.2
}

export function generateInvitationToken() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID().replace(/-/g, '')
  }
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
}
