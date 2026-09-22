import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'
import { normalizeExternalUrl } from '../utils/externalUrl.js'
import siteConfig from '../data/site.js'
import { getFirebaseDb } from '../firebaseClient.js'

function buildWhatsAppUrl(number, message) {
  const digits = number.replace(/\D/g, '')
  if (!digits) return ''
  const normalizedNumber = digits.startsWith('39') ? digits : `39${digits}`
  const query = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${normalizedNumber}${query}`
}

export default function Contact() {
  const { data: site } = useContentBlock('site')
  const { data: contact } = useContentBlock('contact')
  const whatsappHref = buildWhatsAppUrl(siteConfig.whatsappNumber, siteConfig.whatsappMessage)
  const [formState, setFormState] = useState({ status: 'idle', message: '' })
  const channels = [
    {
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      description: contact.channelDescriptions.email,
      enabled: Boolean(site.email),
    },
    {
      label: 'LinkedIn',
      value: 'in/rosario-michele-trotta',
      href: normalizeExternalUrl(site.linkedinUrl),
      description: contact.channelDescriptions.linkedin,
      enabled: Boolean(site.linkedinUrl),
    },
    {
      label: 'WhatsApp',
      value: 'Scrivimi un messaggio',
      href: whatsappHref,
      description: contact.channelDescriptions.whatsapp,
      enabled: Boolean(whatsappHref),
    },
  ].filter((channel) => channel.enabled)

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.reportValidity()) return
    setFormState({ status: 'sending', message: '' })
    const formData = new FormData(form)
    Promise.resolve().then(() => addDoc(collection(getFirebaseDb(), 'contactRequests'), {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company') || '',
      need: formData.get('need'),
      description: formData.get('description'),
      privacyAccepted: formData.get('privacy') === 'on',
      createdAt: serverTimestamp(),
      status: 'new',
    }))
      .then(() => {
        form.reset()
        setFormState({ status: 'success', message: 'Richiesta inviata. Ti ricontatterò appena possibile.' })
      })
      .catch(() => {
        setFormState({ status: 'error', message: 'Non è stato possibile inviare la richiesta. Usa Email o LinkedIn per contattarmi.' })
      })
  }

  return (
    <>
      <Seo
        title="Contatti"
        description="Raccontami la tua idea o il problema che vuoi risolvere: scrivimi attraverso uno dei canali disponibili."
        path="/contatti"
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Contatti" title={contact.title} description={contact.description} as="h1" />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex flex-col rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow duration-200 ease-smooth hover:shadow-card-hover sm:p-7"
              >
                <span className="text-fluid-sm font-semibold uppercase tracking-[0.08em] text-accent-600">
                  {channel.label}
                </span>
                <span className="mt-2 text-fluid-lg font-semibold text-ink-950">{channel.value}</span>
                <span className="mt-2 text-fluid-sm text-ink-600">{channel.description}</span>
              </a>
            ))}
          </div>

          <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:items-start lg:gap-16">
            <div>
              <h2 className="text-fluid-2xl font-bold tracking-tight text-ink-950">
                {contact.formTitle || 'Raccontami da dove partire'}
              </h2>
              <p className="mt-3 max-w-prose text-fluid-base text-ink-600">
                {contact.formDescription || 'Descrivi brevemente la tua esigenza.'}
              </p>

              <form className="mt-8 space-y-5" method="post" onSubmit={handleSubmit} noValidate>
                <div>
                  <label htmlFor="contact-name" className="text-fluid-sm font-medium text-ink-900">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-fluid-sm font-medium text-ink-900">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                  />
                </div>

                <div>
                  <label htmlFor="contact-company" className="text-fluid-sm font-medium text-ink-900">
                    Azienda <span className="font-normal text-ink-500">(facoltativa)</span>
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                  />
                </div>

                <div>
                  <label htmlFor="contact-need" className="text-fluid-sm font-medium text-ink-900">
                    Tipo di esigenza
                  </label>
                  <select
                    id="contact-need"
                    name="need"
                    required
                    defaultValue=""
                    className="mt-2 min-h-[44px] w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                  >
                    <option value="" disabled>Seleziona un’opzione</option>
                    <option value="web-app">Web app o gestionale</option>
                    <option value="automation">Automazione o integrazione</option>
                    <option value="ai">AI applicata a un processo</option>
                    <option value="existing">Miglioramento di uno strumento esistente</option>
                    <option value="other">Non so ancora</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-description" className="text-fluid-sm font-medium text-ink-900">
                    Descrizione del problema o dell’idea
                  </label>
                  <textarea
                    id="contact-description"
                    name="description"
                    rows="5"
                    required
                    className="mt-2 w-full rounded-xl border border-ink-800/20 bg-paper-50 px-4 py-3 text-fluid-base text-ink-950"
                  />
                </div>

                <label htmlFor="contact-privacy" className="flex items-start gap-3 text-fluid-sm text-ink-700">
                  <input
                    id="contact-privacy"
                    name="privacy"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-ink-800/30 text-accent-600 focus:ring-accent-500"
                  />
                  <span>
                    Dichiaro di aver letto la{' '}
                    <Link to="/privacy" className="text-link">Privacy Policy</Link>{' '}
                    relativa al trattamento dei dati inviati tramite questo modulo.
                  </span>
                </label>

                <button type="submit" disabled={formState.status === 'sending'} className="btn-primary w-full sm:w-auto">
                  {formState.status === 'sending' ? 'Invio in corso...' : 'Invia richiesta'}
                </button>

                {formState.message && (
                  <p role="status" className="rounded-xl bg-accent-50 px-4 py-3 text-fluid-sm text-accent-900">
                    {formState.message}
                  </p>
                )}
              </form>
            </div>

            <aside className="rounded-2xl bg-paper-100 p-6 sm:p-8">
              <h2 className="text-fluid-lg font-semibold text-ink-950">{contact.noteTitle}</h2>
              <p className="mt-3 text-fluid-base text-ink-600">{contact.noteBody}</p>
            </aside>
          </div>

        </div>
      </section>
    </>
  )
}
