import { Link } from 'react-router-dom'
import { useInboxAlerts } from '../InboxAlerts.jsx'
import { CONTENT_BLOCKS } from '../schemas/contentBlocks.js'

function incomingLabel(count, singular, plural, empty) {
  if (count === 0) return empty
  return `${count} ${count === 1 ? singular : plural}`
}

export default function Dashboard() {
  const { ready, newRequests, pendingFeedback } = useInboxAlerts()

  return (
    <div>
      <h1 className="text-fluid-xl font-bold text-ink-950">Pannello amministrativo</h1>
      <p className="mt-1 text-fluid-sm text-ink-500">
        Gestisci progetti e testi del sito. Dopo ogni modifica, ricorda di eseguire{' '}
        <code className="rounded bg-ink-950/5 px-1.5 py-0.5">npm run publish</code> dal terminale per renderla visibile
        online. Attiva avvisi per ricevere una notifica del browser quando arriva una richiesta o un feedback
        mentre il pannello è aperto.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link
          to="/admin/richieste"
          className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <h2 className="text-fluid-base font-semibold text-ink-950">Richieste di lavoro</h2>
          <p className="mt-1 text-fluid-sm text-ink-600">
            {ready ? incomingLabel(newRequests, 'richiesta ancora da leggere', 'richieste ancora da leggere', 'Nessuna nuova richiesta') : 'Caricamento...'}
          </p>
        </Link>
        <Link
          to="/admin/testimonianze"
          className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <h2 className="text-fluid-base font-semibold text-ink-950">Feedback</h2>
          <p className="mt-1 text-fluid-sm text-ink-600">
            {ready ? incomingLabel(pendingFeedback, 'feedback pubblico in attesa', 'feedback pubblici in attesa', 'Nessun feedback in attesa') : 'Caricamento...'}
          </p>
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/admin/progetti"
          className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow hover:shadow-card-hover"
        >
          <h2 className="text-fluid-base font-semibold text-ink-950">Progetti</h2>
          <p className="mt-1 text-fluid-sm text-ink-600">Aggiungi, modifica o rimuovi i case study del portfolio.</p>
        </Link>

        {CONTENT_BLOCKS.map((block) => (
          <Link
            key={block.id}
            to={`/admin/contenuti/${block.id}`}
            className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <h2 className="text-fluid-base font-semibold text-ink-950">{block.label}</h2>
            <p className="mt-1 text-fluid-sm text-ink-600">Modifica i testi di questa sezione.</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
