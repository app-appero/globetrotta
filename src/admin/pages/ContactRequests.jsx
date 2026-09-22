import { useContactRequests } from '../hooks/useContactRequests.js'

const STATUS_LABELS = {
  new: 'Nuova',
  read: 'Letta',
  archived: 'Archiviata',
}

function formatDate(value) {
  if (!value?.toDate) return 'Data in elaborazione'
  return value.toDate().toLocaleString('it-IT')
}

export default function ContactRequests() {
  const { requests, loading, error, updateStatus } = useContactRequests()

  return (
    <div>
      <h1 className="text-fluid-xl font-bold text-ink-950">Richieste di contatto</h1>
      <p className="mt-1 text-fluid-sm text-ink-500">Le richieste inviate dal form vengono conservate in Firestore e sono visibili solo agli admin.</p>

      {loading && <p className="mt-8 text-fluid-sm text-ink-500">Caricamento...</p>}
      {error && <p className="mt-8 text-fluid-sm text-red-600">Impossibile caricare le richieste: {error}</p>}
      {!loading && !error && requests.length === 0 && (
        <p className="mt-8 rounded-2xl bg-paper-50 p-6 text-fluid-sm text-ink-600">Non ci sono ancora richieste.</p>
      )}

      <div className="mt-8 space-y-4">
        {requests.map((request) => (
          <article key={request.id} className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="text-fluid-lg font-semibold text-ink-950">{request.name}</h2>
                <p className="mt-1 text-fluid-sm text-ink-600">
                  <a className="text-link" href={`mailto:${request.email}`}>{request.email}</a>
                  {request.company && ` · ${request.company}`}
                </p>
              </div>
              <select
                value={request.status || 'new'}
                onChange={(event) => updateStatus(request.id, event.target.value)}
                aria-label={`Stato richiesta di ${request.name}`}
                className="min-h-[40px] rounded-xl border border-ink-800/20 bg-paper-50 px-3 text-fluid-sm"
              >
                {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>
            <p className="mt-4 text-fluid-sm text-ink-500">{formatDate(request.createdAt)} · {request.need}</p>
            <p className="mt-4 whitespace-pre-wrap text-fluid-base text-ink-700">{request.description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
