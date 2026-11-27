import { isEmail, oneLine } from './mailConfig.js'

const NEED_LABELS = {
  'web-app': 'Web app o gestionale',
  automation: 'Automazione o integrazione',
  ai: 'AI applicata a un processo',
  existing: 'Miglioramento di uno strumento esistente',
  other: 'Non so ancora',
}

function needLabel(value) {
  const code = oneLine(value, 80)
  return NEED_LABELS[code] || code || 'Non indicata'
}

export function buildContactNotification(data, siteUrl) {
  const name = oneLine(data?.name, 120) || 'Senza nome'
  const email = oneLine(data?.email, 320)
  const company = oneLine(data?.company, 160)
  const description = String(data?.description ?? '').replace(/\u0000/g, '').trim().slice(0, 4000)
  const lines = [
    `È arrivata una nuova richiesta di lavoro da ${name}.`,
    '',
    `Nome: ${name}`,
    `Email: ${email || 'non indicata'}`,
  ]
  if (company) lines.push(`Azienda: ${company}`)
  lines.push(
    `Esigenza: ${needLabel(data?.need)}`,
    '',
    description || 'Nessuna descrizione.',
    '',
    `Apri le richieste: ${siteUrl}/admin/richieste`,
  )
  return {
    kind: 'contact',
    subject: `Nuova richiesta di lavoro da ${oneLine(name, 80)}`,
    text: lines.join('\n'),
    replyTo: isEmail(email) ? email : undefined,
  }
}

export function buildFeedbackNotification(data, siteUrl) {
  if (data?.source !== 'feedback-form' || data?.status !== 'pending') return null

  const name = oneLine(data?.clientName, 120) || 'Cliente'
  const role = oneLine(data?.clientRole, 120)
  const company = oneLine(data?.companyName, 160)
  const project = oneLine(data?.projectName, 200)
  const result = String(data?.concreteResult ?? '').replace(/\u0000/g, '').trim().slice(0, 500)
  const text = String(data?.testimonialText ?? '').replace(/\u0000/g, '').trim().slice(0, 4000)
  const rating = Number.isInteger(data?.rating) ? data.rating : null
  const lines = [
    `È arrivato un nuovo feedback da ${name}. Resta in attesa finché non lo approvi.`,
    '',
    `Nome: ${name}`,
  ]
  if (role) lines.push(`Ruolo: ${role}`)
  if (company) lines.push(`Azienda: ${company}`)
  if (project) lines.push(`Progetto: ${project}`)
  if (rating) lines.push(`Valutazione: ${rating}/5`)
  lines.push('', text || 'Nessun testo.')
  if (result) lines.push('', `Risultato: ${result}`)
  lines.push('', `Apri le testimonianze: ${siteUrl}/admin/testimonianze`)

  return {
    kind: 'feedback',
    subject: `Nuovo feedback da ${oneLine(name, 80)}`,
    text: lines.join('\n'),
  }
}
