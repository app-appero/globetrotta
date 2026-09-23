import { useId, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTestimonialsAdmin } from '../hooks/useTestimonialsAdmin.js'
import { useProjectsList } from '../hooks/useProjectsAdmin.js'
import ImageField from '../components/fields/ImageField.jsx'
import TestimonialCard from '../../components/TestimonialCard.jsx'
import { TESTIMONIAL_STATUS_LABELS, getTestimonialStatusLabel, isSubstantialEdit } from '../../utils/testimonials.js'

const STATUS_BADGE_CLASS = {
  pending: 'bg-accent-100 text-accent-700',
  approved: 'bg-accent-50 text-accent-700 border border-accent-600/20',
  rejected: 'bg-ink-950/5 text-ink-500',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-fluid-xs font-medium ${STATUS_BADGE_CLASS[status] || 'bg-ink-950/5 text-ink-600'}`}>
      {getTestimonialStatusLabel(status)}
    </span>
  )
}

function formatDate(value) {
  if (!value?.toDate) return 'Data in elaborazione'
  return value.toDate().toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}

const EMPTY_DRAFT = {
  clientName: '',
  clientRole: '',
  companyName: '',
  companyWebsite: '',
  projectId: '',
  projectName: '',
  testimonialText: '',
  shortQuote: '',
  concreteResult: '',
  rating: '',
  clientImage: '',
  showIdentity: true,
  showOnProject: true,
  featured: false,
  displayOrder: 0,
  status: 'pending',
}

function TestimonialEditor({ testimonial, projects, onCancel, onSave }) {
  const isCreate = !testimonial
  const [draft, setDraft] = useState(() => (testimonial ? { ...EMPTY_DRAFT, ...testimonial } : { ...EMPTY_DRAFT }))
  const [saving, setSaving] = useState(false)
  const uid = useId()
  const fieldId = (name) => `${uid}-${name}`

  function set(key, value) {
    setDraft((prev) => ({ ...prev, [key]: value }))
  }

  const substantialEdit = testimonial ? isSubstantialEdit(testimonial.testimonialText, draft.testimonialText) : false

  async function handleSubmit(event) {
    event.preventDefault()
    setSaving(true)
    const selectedProject = projects.find((project) => project.slug === draft.projectId)
    const payload = {
      clientName: draft.clientName.trim(),
      testimonialText: draft.testimonialText.trim(),
      shortQuote: draft.shortQuote.trim() || draft.testimonialText.trim().slice(0, 200),
      showIdentity: Boolean(draft.showIdentity),
      showOnProject: Boolean(draft.showOnProject),
      featured: Boolean(draft.featured),
      displayOrder: Number(draft.displayOrder) || 0,
      status: draft.status,
      consentToPublish: testimonial ? Boolean(testimonial.consentToPublish) : true,
      invitationUsed: testimonial ? Boolean(testimonial.invitationUsed) : false,
      publishedAt: draft.status === 'approved' ? (testimonial?.publishedAt || new Date()) : (testimonial?.publishedAt ?? null),
    }
    if (draft.clientRole.trim()) payload.clientRole = draft.clientRole.trim()
    if (draft.companyName.trim()) payload.companyName = draft.companyName.trim()
    if (draft.companyWebsite.trim()) payload.companyWebsite = draft.companyWebsite.trim()
    if (draft.concreteResult.trim()) payload.concreteResult = draft.concreteResult.trim()
    if (draft.clientImage) payload.clientImage = draft.clientImage
    if (draft.rating) payload.rating = Number(draft.rating)
    if (selectedProject) {
      payload.projectId = selectedProject.slug
      payload.projectName = selectedProject.title
    }
    await onSave(payload)
    setSaving(false)
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-ink-800/10 bg-paper-50 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('clientName')} className="text-fluid-xs font-medium text-ink-700">Nome cliente</label>
            <input id={fieldId('clientName')} required value={draft.clientName} onChange={(e) => set('clientName', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
          </div>
          <div>
            <label htmlFor={fieldId('clientRole')} className="text-fluid-xs font-medium text-ink-700">Ruolo (opzionale)</label>
            <input id={fieldId('clientRole')} value={draft.clientRole} onChange={(e) => set('clientRole', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
          </div>
          <div>
            <label htmlFor={fieldId('companyName')} className="text-fluid-xs font-medium text-ink-700">Azienda (opzionale)</label>
            <input id={fieldId('companyName')} value={draft.companyName} onChange={(e) => set('companyName', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
          </div>
          <div>
            <label htmlFor={fieldId('companyWebsite')} className="text-fluid-xs font-medium text-ink-700">Sito azienda (opzionale)</label>
            <input id={fieldId('companyWebsite')} value={draft.companyWebsite} onChange={(e) => set('companyWebsite', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
          </div>
        </div>

        <div>
          <label htmlFor={fieldId('projectId')} className="text-fluid-xs font-medium text-ink-700">Progetto collegato</label>
          <select id={fieldId('projectId')} value={draft.projectId} onChange={(e) => set('projectId', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm">
            <option value="">Nessun progetto collegato</option>
            {projects.map((project) => (
              <option key={project.slug} value={project.slug}>{project.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={fieldId('testimonialText')} className="text-fluid-xs font-medium text-ink-700">Testimonianza completa</label>
          <textarea id={fieldId('testimonialText')} required rows={4} value={draft.testimonialText} onChange={(e) => set('testimonialText', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
          {substantialEdit && (
            <p className="mt-2 rounded-lg bg-accent-50 px-3 py-2 text-fluid-xs text-accent-900">
              Il testo è stato modificato in modo sostanziale rispetto all’originale del cliente: valuta se richiedere
              nuovamente la sua approvazione prima di pubblicare.
            </p>
          )}
        </div>

        <div>
          <label htmlFor={fieldId('shortQuote')} className="text-fluid-xs font-medium text-ink-700">Citazione breve per le card (opzionale)</label>
          <textarea id={fieldId('shortQuote')} rows={2} value={draft.shortQuote} onChange={(e) => set('shortQuote', e.target.value)} placeholder="Se vuota, viene ricavata automaticamente dalla testimonianza completa." className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
        </div>

        <div>
          <label htmlFor={fieldId('concreteResult')} className="text-fluid-xs font-medium text-ink-700">Risultato concreto (opzionale)</label>
          <textarea id={fieldId('concreteResult')} rows={2} value={draft.concreteResult} onChange={(e) => set('concreteResult', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor={fieldId('rating')} className="text-fluid-xs font-medium text-ink-700">Valutazione (opzionale)</label>
            <select id={fieldId('rating')} value={draft.rating} onChange={(e) => set('rating', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm">
              <option value="">Nessuna</option>
              {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} su 5</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={fieldId('status')} className="text-fluid-xs font-medium text-ink-700">Stato</label>
            <select id={fieldId('status')} value={draft.status} onChange={(e) => set('status', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm">
              {Object.entries(TESTIMONIAL_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={fieldId('displayOrder')} className="text-fluid-xs font-medium text-ink-700">Ordine di visualizzazione</label>
            <input id={fieldId('displayOrder')} type="number" value={draft.displayOrder} onChange={(e) => set('displayOrder', e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
          </div>
        </div>

        <div>
          <label htmlFor={fieldId('clientImage')} className="text-fluid-xs font-medium text-ink-700">Foto o logo cliente (opzionale)</label>
          <div className="mt-1">
            <ImageField id={fieldId('clientImage')} value={draft.clientImage} onChange={(value) => set('clientImage', value)} uploadPath="testimonials" />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <label htmlFor={fieldId('showIdentity')} className="flex items-center gap-2 text-fluid-sm text-ink-700">
            <input id={fieldId('showIdentity')} type="checkbox" checked={draft.showIdentity} onChange={(e) => set('showIdentity', e.target.checked)} className="h-4 w-4 rounded border-ink-800/30 text-accent-600" />
            Mostra nome/azienda/foto
          </label>
          <label htmlFor={fieldId('showOnProject')} className="flex items-center gap-2 text-fluid-sm text-ink-700">
            <input id={fieldId('showOnProject')} type="checkbox" checked={draft.showOnProject} onChange={(e) => set('showOnProject', e.target.checked)} className="h-4 w-4 rounded border-ink-800/30 text-accent-600" />
            Mostra nel progetto
          </label>
          <label htmlFor={fieldId('featured')} className="flex items-center gap-2 text-fluid-sm text-ink-700">
            <input id={fieldId('featured')} type="checkbox" checked={draft.featured} onChange={(e) => set('featured', e.target.checked)} className="h-4 w-4 rounded border-ink-800/30 text-accent-600" />
            In evidenza in Home
          </label>
        </div>

        <div className="flex items-center gap-3 border-t border-ink-800/10 pt-4">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? 'Salvataggio...' : isCreate ? 'Crea testimonianza' : 'Salva modifiche'}
          </button>
          <button type="button" onClick={onCancel} className="btn-secondary">Annulla</button>
        </div>
      </form>

      <div>
        <p className="mb-2 text-fluid-xs font-semibold uppercase tracking-wide text-ink-500">Anteprima pubblica</p>
        <TestimonialCard testimonial={{ ...draft, rating: Number(draft.rating) || undefined }} className="max-w-sm" />
      </div>
    </div>
  )
}

export default function Testimonials() {
  const { testimonials, loading, error, updateTestimonial, createTestimonial, removeTestimonial } = useTestimonialsAdmin()
  const { projects } = useProjectsList()
  const [statusFilter, setStatusFilter] = useState('all')
  const [projectFilter, setProjectFilter] = useState('all')
  const [featuredOnly, setFeaturedOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [creating, setCreating] = useState(false)

  const summary = useMemo(() => ({
    total: testimonials.length,
    pending: testimonials.filter((t) => t.status === 'pending').length,
    approved: testimonials.filter((t) => t.status === 'approved').length,
    rejected: testimonials.filter((t) => t.status === 'rejected').length,
    featured: testimonials.filter((t) => t.featured).length,
  }), [testimonials])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return testimonials.filter((t) => {
      if (statusFilter !== 'all' && t.status !== statusFilter) return false
      if (projectFilter !== 'all' && t.projectId !== projectFilter) return false
      if (featuredOnly && !t.featured) return false
      if (term) {
        const haystack = [t.clientName, t.companyName, t.testimonialText].filter(Boolean).join(' ').toLowerCase()
        if (!haystack.includes(term)) return false
      }
      return true
    })
  }, [testimonials, statusFilter, projectFilter, featuredOnly, search])

  async function handleDelete(testimonial) {
    if (!window.confirm(`Eliminare definitivamente la testimonianza di "${testimonial.clientName}"? L'operazione non è reversibile.`)) return
    await removeTestimonial(testimonial.id)
  }

  const editingTestimonial = editingId ? testimonials.find((t) => t.id === editingId) : null

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-fluid-xl font-bold text-ink-950">Testimonianze</h1>
          <p className="mt-1 text-fluid-sm text-ink-500">
            I feedback inviati dal modulo pubblico entrano sempre come "In attesa": nulla viene pubblicato senza la
            tua approvazione.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/admin/testimonianze/inviti" className="btn-secondary shrink-0">Inviti personali</Link>
          <button type="button" onClick={() => { setCreating(true); setEditingId(null) }} className="btn-primary shrink-0">
            + Nuova testimonianza
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[
          ['Totali', summary.total],
          ['In attesa', summary.pending],
          ['Pubblicate', summary.approved],
          ['Rifiutate', summary.rejected],
          ['In evidenza', summary.featured],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-ink-800/10 bg-paper-50 p-4">
            <p className="text-fluid-2xl font-bold text-ink-950">{value}</p>
            <p className="text-fluid-xs text-ink-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <label htmlFor="testimonials-status-filter" className="sr-only">Filtra per stato</label>
        <select id="testimonials-status-filter" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-xs">
          <option value="all">Tutti gli stati</option>
          {Object.entries(TESTIMONIAL_STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <label htmlFor="testimonials-project-filter" className="sr-only">Filtra per progetto</label>
        <select id="testimonials-project-filter" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)} className="rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-xs">
          <option value="all">Tutti i progetti</option>
          {projects.map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}
        </select>
        <label htmlFor="testimonials-featured-filter" className="flex items-center gap-2 rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-xs text-ink-700">
          <input id="testimonials-featured-filter" type="checkbox" checked={featuredOnly} onChange={(e) => setFeaturedOnly(e.target.checked)} className="h-4 w-4 rounded border-ink-800/30 text-accent-600" />
          Solo in evidenza
        </label>
        <label htmlFor="testimonials-search" className="sr-only">Cerca testimonianze</label>
        <input
          id="testimonials-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cerca per cliente, azienda o testo..."
          className="min-w-[220px] flex-1 rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-xs"
        />
      </div>

      {creating && (
        <div className="mt-6">
          <h2 className="text-fluid-base font-semibold text-ink-950">Nuova testimonianza</h2>
          <div className="mt-3">
            <TestimonialEditor
              projects={projects}
              onCancel={() => setCreating(false)}
              onSave={async (payload) => {
                await createTestimonial(payload)
                setCreating(false)
              }}
            />
          </div>
        </div>
      )}

      {loading && <p className="mt-8 text-fluid-sm text-ink-500">Caricamento...</p>}
      {error && <p className="mt-8 text-fluid-sm text-red-600">Impossibile caricare le testimonianze: {error}</p>}
      {!loading && !error && filtered.length === 0 && (
        <p className="mt-8 rounded-2xl bg-paper-50 p-6 text-fluid-sm text-ink-600">Nessuna testimonianza corrisponde ai filtri selezionati.</p>
      )}

      <div className="mt-6 space-y-4">
        {filtered.map((testimonial) => (
          <article key={testimonial.id} className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card">
            {editingTestimonial?.id === testimonial.id ? (
              <TestimonialEditor
                testimonial={testimonial}
                projects={projects}
                onCancel={() => setEditingId(null)}
                onSave={async (payload) => {
                  await updateTestimonial(testimonial.id, payload)
                  setEditingId(null)
                }}
              />
            ) : (
              <>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-fluid-lg font-semibold text-ink-950">{testimonial.clientName}</h2>
                      <StatusBadge status={testimonial.status} />
                      {testimonial.featured && (
                        <span className="inline-flex rounded-full bg-accent-100 px-2.5 py-1 text-fluid-xs font-medium text-accent-700">In evidenza</span>
                      )}
                    </div>
                    <p className="mt-1 text-fluid-sm text-ink-600">
                      {[testimonial.clientRole, testimonial.companyName].filter(Boolean).join(' · ') || 'Nessun ruolo/azienda indicati'}
                      {testimonial.projectName && ` · Progetto: ${testimonial.projectName}`}
                    </p>
                    <p className="mt-1 text-fluid-xs text-ink-500">
                      Ricevuta il {formatDate(testimonial.createdAt)} · Fonte: {testimonial.source === 'admin' ? 'Admin' : 'Modulo pubblico'} ·
                      {' '}Consenso pubblicazione: {testimonial.consentToPublish ? 'Sì' : 'No'}
                      {testimonial.rating ? ` · Valutazione: ${testimonial.rating}/5` : ''}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {testimonial.status !== 'approved' && (
                      <button type="button" onClick={() => updateTestimonial(testimonial.id, { status: 'approved', publishedAt: new Date() })} className="text-fluid-xs font-medium text-accent-700 hover:underline">
                        Approva
                      </button>
                    )}
                    {testimonial.status !== 'rejected' && (
                      <button type="button" onClick={() => updateTestimonial(testimonial.id, { status: 'rejected' })} className="text-fluid-xs font-medium text-red-600 hover:underline">
                        Rifiuta
                      </button>
                    )}
                    {testimonial.status !== 'pending' && (
                      <button type="button" onClick={() => updateTestimonial(testimonial.id, { status: 'pending' })} className="text-fluid-xs font-medium text-ink-600 hover:underline">
                        Rimetti in attesa
                      </button>
                    )}
                    <button type="button" onClick={() => { setEditingId(testimonial.id); setCreating(false) }} className="text-fluid-xs font-medium text-ink-700 hover:underline">
                      Modifica
                    </button>
                    <button type="button" onClick={() => handleDelete(testimonial)} className="text-fluid-xs font-medium text-red-600 hover:underline">
                      Elimina
                    </button>
                  </div>
                </div>

                <p className="mt-4 whitespace-pre-wrap text-fluid-sm text-ink-700">{testimonial.testimonialText}</p>
                {testimonial.concreteResult && (
                  <p className="mt-3 rounded-xl bg-accent-50 px-4 py-3 text-fluid-sm text-accent-900">
                    <span className="font-semibold">Risultato ottenuto:</span> {testimonial.concreteResult}
                  </p>
                )}
              </>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
