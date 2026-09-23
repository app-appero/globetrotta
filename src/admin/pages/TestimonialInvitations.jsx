import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTestimonialInvitations } from '../hooks/useTestimonialInvitations.js'
import { useProjectsList } from '../hooks/useProjectsAdmin.js'

function buildInvitationLink(token) {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return `${origin}/feedback?token=${token}`
}

function formatDate(value) {
  if (!value?.toDate) return '—'
  return value.toDate().toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}

function invitationStatusLabel(invitation) {
  if (invitation.used) return 'Utilizzato'
  if (invitation.active === false) return 'Disattivato'
  const expiresAt = invitation.expiresAt?.toDate ? invitation.expiresAt.toDate() : null
  if (expiresAt && expiresAt.getTime() < Date.now()) return 'Scaduto'
  return 'Attivo'
}

export default function TestimonialInvitations() {
  const { invitations, loading, error, createInvitation, setInvitationActive, removeInvitation } = useTestimonialInvitations()
  const { projects } = useProjectsList()
  const [projectId, setProjectId] = useState('')
  const [clientName, setClientName] = useState('')
  const [expiresAt, setExpiresAt] = useState('')
  const [creating, setCreating] = useState(false)
  const [copiedToken, setCopiedToken] = useState('')

  async function handleCreate(event) {
    event.preventDefault()
    setCreating(true)
    const project = projects.find((item) => item.slug === projectId)
    try {
      await createInvitation({
        projectId: project?.slug || '',
        projectName: project?.title || '',
        clientName: clientName.trim(),
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      })
      setClientName('')
      setExpiresAt('')
    } finally {
      setCreating(false)
    }
  }

  async function handleCopy(token) {
    const link = buildInvitationLink(token)
    try {
      await navigator.clipboard.writeText(link)
      setCopiedToken(token)
      setTimeout(() => setCopiedToken(''), 2000)
    } catch {
      window.prompt('Copia il link:', link)
    }
  }

  async function handleDelete(token, name) {
    if (!window.confirm(`Eliminare l'invito per "${name || 'questo cliente'}"?`)) return
    await removeInvitation(token)
  }

  return (
    <div>
      <Link to="/admin/testimonianze" className="text-fluid-xs font-medium text-ink-600 hover:text-ink-950">
        ← Testimonianze
      </Link>
      <h1 className="mt-3 text-fluid-xl font-bold text-ink-950">Inviti personali</h1>
      <p className="mt-1 text-fluid-sm text-ink-500">
        Crea un link personale da inviare a un cliente specifico: il progetto e il nome saranno già precompilati nel
        modulo di feedback, e il link non potrà essere riutilizzato dopo l’invio.
      </p>

      <form onSubmit={handleCreate} className="mt-6 grid grid-cols-1 gap-4 rounded-2xl border border-ink-800/10 bg-paper-50 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="invite-project" className="text-fluid-xs font-medium text-ink-700">Progetto</label>
          <select id="invite-project" value={projectId} onChange={(e) => setProjectId(e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm">
            <option value="">Nessuno specifico</option>
            {projects.map((project) => <option key={project.slug} value={project.slug}>{project.title}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="invite-client-name" className="text-fluid-xs font-medium text-ink-700">Nome cliente</label>
          <input id="invite-client-name" required value={clientName} onChange={(e) => setClientName(e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
        </div>
        <div>
          <label htmlFor="invite-expires" className="text-fluid-xs font-medium text-ink-700">Scadenza (opzionale)</label>
          <input id="invite-expires" type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} className="mt-1 w-full rounded-xl border border-ink-800/15 bg-paper-50 px-3 py-2 text-fluid-sm" />
        </div>
        <div className="flex items-end">
          <button type="submit" disabled={creating} className="btn-primary w-full disabled:opacity-60">
            {creating ? 'Creazione...' : 'Genera link'}
          </button>
        </div>
      </form>

      {loading && <p className="mt-8 text-fluid-sm text-ink-500">Caricamento...</p>}
      {error && <p className="mt-8 text-fluid-sm text-red-600">Impossibile caricare gli inviti: {error}</p>}
      {!loading && !error && invitations.length === 0 && (
        <p className="mt-8 rounded-2xl bg-paper-50 p-6 text-fluid-sm text-ink-600">Non hai ancora creato nessun invito.</p>
      )}

      <div className="mt-6 space-y-3">
        {invitations.map((invitation) => (
          <div key={invitation.id} className="flex flex-col gap-3 rounded-2xl border border-ink-800/10 bg-paper-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-fluid-sm font-semibold text-ink-950">
                {invitation.clientName || 'Cliente senza nome'}
                <span className="ml-2 rounded-full bg-ink-950/5 px-2 py-0.5 text-fluid-xs font-normal text-ink-600">
                  {invitationStatusLabel(invitation)}
                </span>
              </p>
              <p className="text-fluid-xs text-ink-500">
                {invitation.projectName || 'Nessun progetto specifico'} · Creato il {formatDate(invitation.createdAt)}
                {invitation.expiresAt && ` · Scade il ${formatDate(invitation.expiresAt)}`}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={() => handleCopy(invitation.id)} className="text-fluid-xs font-medium text-accent-700 hover:underline">
                {copiedToken === invitation.id ? 'Copiato!' : 'Copia link'}
              </button>
              {!invitation.used && (
                <button
                  type="button"
                  onClick={() => setInvitationActive(invitation.id, invitation.active === false)}
                  className="text-fluid-xs font-medium text-ink-700 hover:underline"
                >
                  {invitation.active === false ? 'Riattiva' : 'Disattiva'}
                </button>
              )}
              <button type="button" onClick={() => handleDelete(invitation.id, invitation.clientName)} className="text-fluid-xs font-medium text-red-600 hover:underline">
                Elimina
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
