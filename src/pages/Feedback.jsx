import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { usePublicContent } from '../hooks/usePublicContent.jsx'
import { getFirebaseDb } from '../firebaseClient.js'

const RATING_OPTIONS = [5, 4, 3, 2, 1]

function isInvitationUsable(invitation) {
  if (!invitation) return false
  if (invitation.active === false) return false
  if (invitation.used === true) return false
  const expiresAt = invitation.expiresAt?.toDate ? invitation.expiresAt.toDate() : null
  if (expiresAt && expiresAt.getTime() < Date.now()) return false
  return true
}

export default function Feedback() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { projects } = usePublicContent()

  const [invitation, setInvitation] = useState(null)
  const [invitationState, setInvitationState] = useState(token ? 'loading' : 'none')
  const [formState, setFormState] = useState({ status: 'idle', message: '' })
  // Campi precompilabili da un invito: controllati, perché l'invito arriva
  // da una lettura Firestore asincrona che risolve dopo il primo render (un
  // defaultValue non si applicherebbe più una volta montato l'input).
  const [clientName, setClientName] = useState('')
  const [projectId, setProjectId] = useState('')

  useEffect(() => {
    if (!token) return
    let active = true
    getDoc(doc(getFirebaseDb(), 'testimonialInvitations', token))
      .then((snapshot) => {
        if (!active) return
        const data = snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null
        if (data && isInvitationUsable(data)) {
          setInvitation(data)
          setClientName(data.clientName || '')
          setProjectId(data.projectId || '')
          setInvitationState('valid')
        } else {
          setInvitationState('invalid')
        }
      })
      .catch(() => {
        if (active) setInvitationState('invalid')
      })
    return () => {
      active = false
    }
  }, [token])

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return

    const formData = new FormData(form)

    // Honeypot: campo invisibile ai visitatori umani. Se arriva compilato,
    // ignoriamo silenziosamente l'invio senza dare indicazioni utili a un bot
    // (mostrando comunque il messaggio di conferma, nel raro caso in cui sia
    // stata l'autocompilazione del browser a valorizzarlo per errore).
    if (formData.get('website')) {
      setFormState({
        status: 'success',
        message: 'Grazie per il tuo feedback. La testimonianza è stata ricevuta e sarà verificata prima dell’eventuale pubblicazione.',
      })
      return
    }

    setFormState({ status: 'sending', message: '' })

    const selectedProject = projects.find((project) => project.slug === formData.get('projectId'))
    const rating = formData.get('rating')

    const payload = {
      clientName: formData.get('clientName')?.toString().trim() || '',
      testimonialText: formData.get('testimonialText')?.toString().trim() || '',
      consentToPublish: formData.get('consentToPublish') === 'on',
      showIdentity: formData.get('showIdentity') === 'on',
      showOnProject: true,
      status: 'pending',
      featured: false,
      displayOrder: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      publishedAt: null,
      source: 'feedback-form',
      invitationUsed: Boolean(invitation),
    }

    const clientRole = formData.get('clientRole')?.toString().trim()
    if (clientRole) payload.clientRole = clientRole
    const companyName = formData.get('companyName')?.toString().trim()
    if (companyName) payload.companyName = companyName
    const concreteResult = formData.get('concreteResult')?.toString().trim()
    if (concreteResult) payload.concreteResult = concreteResult
    if (selectedProject) {
      payload.projectId = selectedProject.slug
      payload.projectName = selectedProject.title
    }
    if (rating) payload.rating = Number(rating)
    if (invitation?.id) payload.invitationToken = invitation.id

    try {
      await addDoc(collection(getFirebaseDb(), 'testimonials'), payload)
      if (invitation?.id) {
        updateDoc(doc(getFirebaseDb(), 'testimonialInvitations', invitation.id), {
          used: true,
          usedAt: serverTimestamp(),
        }).catch(() => {
          // Il feedback è già stato salvato: se il link resta segnato come
          // "non usato" nel peggiore dei casi potrà essere riutilizzato,
          // non è un problema bloccante per l'utente.
        })
      }
      form.reset()
      setFormState({
        status: 'success',
        message: 'Grazie per il tuo feedback. La testimonianza è stata ricevuta e sarà verificata prima dell’eventuale pubblicazione.',
      })
    } catch {
      setFormState({
        status: 'error',
        message: 'Non è stato possibile inviare il feedback. Riprova tra qualche istante o scrivimi direttamente via email.',
      })
    }
  }

  return (
    <>
      <Seo
        title="Feedback"
        description="Com'è stata la tua esperienza con GlobeTrotta? Lascia un feedback sul progetto realizzato insieme."
        path="/feedback"
      />

      <section className="py-14 sm:py-20">
        <div className="container-page max-w-2xl">
          <SectionHeading
            eyebrow="Feedback"
            title="Com’è stata la tua esperienza?"
            description="Il tuo feedback mi aiuta a migliorare il mio lavoro e permette ad altre persone di comprendere meglio il valore dei progetti realizzati."
            as="h1"
          />

          {formState.status === 'success' ? (
            <p role="status" className="mt-10 rounded-2xl bg-accent-50 px-6 py-5 text-fluid-base text-accent-900">
              {formState.message}
            </p>
          ) : (
            <form className="mt-10 space-y-5" method="post" onSubmit={handleSubmit} noValidate>
              {/* Honeypot antispam: rimane vuoto per le persone, i bot spesso lo compilano comunque. */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="feedback-website">Non compilare questo campo</label>
                <input id="feedback-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="feedback-name" className="text-fluid-sm font-medium text-ink-900">
                  Nome e cognome
                </label>
                <input
                  id="feedback-name"
                  name="clientName"
                  type="text"
                  autoComplete="name"
                  required
                  value={clientName}
                  onChange={(event) => setClientName(event.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                />
              </div>

              <div>
                <label htmlFor="feedback-role" className="text-fluid-sm font-medium text-ink-900">
                  Ruolo o qualifica <span className="font-normal text-ink-500">(facoltativo)</span>
                </label>
                <input
                  id="feedback-role"
                  name="clientRole"
                  type="text"
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                />
              </div>

              <div>
                <label htmlFor="feedback-company" className="text-fluid-sm font-medium text-ink-900">
                  Azienda o attività <span className="font-normal text-ink-500">(facoltativa)</span>
                </label>
                <input
                  id="feedback-company"
                  name="companyName"
                  type="text"
                  autoComplete="organization"
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                />
              </div>

              <div>
                <label htmlFor="feedback-project" className="text-fluid-sm font-medium text-ink-900">
                  Progetto realizzato
                </label>
                <select
                  id="feedback-project"
                  name="projectId"
                  value={projectId}
                  onChange={(event) => setProjectId(event.target.value)}
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                >
                  <option value="">Non è legato a un progetto specifico</option>
                  {projects.map((project) => (
                    <option key={project.slug} value={project.slug}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="feedback-text" className="text-fluid-sm font-medium text-ink-900">
                  Testimonianza
                </label>
                <p className="mt-1 text-fluid-xs text-ink-500">
                  Puoi raccontare brevemente quale problema volevi risolvere, com’è stata la collaborazione e che
                  risultato hai ottenuto.
                </p>
                <textarea
                  id="feedback-text"
                  name="testimonialText"
                  rows="5"
                  required
                  minLength={10}
                  maxLength={4000}
                  className="mt-2 w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                />
              </div>

              <div>
                <label htmlFor="feedback-result" className="text-fluid-sm font-medium text-ink-900">
                  Risultato concreto ottenuto <span className="font-normal text-ink-500">(facoltativo)</span>
                </label>
                <textarea
                  id="feedback-result"
                  name="concreteResult"
                  rows="2"
                  maxLength={500}
                  className="mt-2 w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                />
              </div>

              <div>
                <label htmlFor="feedback-rating" className="text-fluid-sm font-medium text-ink-900">
                  Valutazione <span className="font-normal text-ink-500">(facoltativa, da 1 a 5)</span>
                </label>
                <select
                  id="feedback-rating"
                  name="rating"
                  defaultValue=""
                  className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                >
                  <option value="">Preferisco non valutare</option>
                  {RATING_OPTIONS.map((value) => (
                    <option key={value} value={value}>
                      {value} su 5
                    </option>
                  ))}
                </select>
              </div>

              <label htmlFor="feedback-consent" className="flex items-start gap-3 text-fluid-sm text-ink-700">
                <input
                  id="feedback-consent"
                  name="consentToPublish"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 shrink-0 rounded border-ink-800/30 text-accent-600 focus:ring-accent-500"
                />
                <span>
                  Autorizzo GlobeTrotta a utilizzare e pubblicare questa testimonianza sul sito, eventualmente
                  associandola al progetto indicato, nel rispetto delle preferenze selezionate. Leggi la{' '}
                  <Link to="/privacy" className="text-link">Privacy Policy</Link>.
                </span>
              </label>

              <label htmlFor="feedback-show-identity" className="flex items-start gap-3 text-fluid-sm text-ink-700">
                <input
                  id="feedback-show-identity"
                  name="showIdentity"
                  type="checkbox"
                  defaultChecked
                  className="mt-1 h-4 w-4 shrink-0 rounded border-ink-800/30 text-accent-600 focus:ring-accent-500"
                />
                <span>
                  Autorizzo inoltre a mostrare pubblicamente il mio nome, l’azienda, il ruolo e un’eventuale foto o
                  logo insieme alla testimonianza <span className="text-ink-500">(facoltativo)</span>.
                </span>
              </label>

              <button type="submit" disabled={formState.status === 'sending'} className="btn-primary w-full sm:w-auto">
                {formState.status === 'sending' ? 'Invio in corso...' : 'Invia feedback'}
              </button>

              {formState.status === 'error' && (
                <p role="alert" className="rounded-xl bg-paper-100 px-4 py-3 text-fluid-sm text-red-600">
                  {formState.message}
                </p>
              )}

              {invitationState === 'invalid' && (
                <p className="text-fluid-xs text-ink-500">
                  Il link personale non è più valido, ma puoi comunque inviare il tuo feedback con questo modulo.
                </p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  )
}
