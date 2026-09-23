import { useEffect, useState } from 'react'
import { useRouteError } from 'react-router-dom'

// Dopo ogni deploy i file JS/CSS cambiano nome (hash del contenuto). Una scheda
// rimasta aperta con l'HTML precedente prova a caricare un chunk che non
// esiste più; Firebase Hosting risponde con index.html (rewrite "**") al posto
// di un 404, e quel codice mandato a JSON.parse/import() genera errori come
// "Unexpected token '<', <!DOCTYPE...". Prima si vedeva solo la schermata
// bianca di default di react-router ("Unexpected Application Error!") e
// bisognava ricaricare a mano: qui lo facciamo automaticamente, una sola
// volta, prima di mostrare un messaggio all'utente.
const RELOAD_FLAG_KEY = 'gt-stale-chunk-reload-at'
const RELOAD_COOLDOWN_MS = 15000

function isStaleDeploymentError(error) {
  const message = String(error?.message || error || '')
  return (
    /failed to fetch dynamically imported module/i.test(message) ||
    /error loading dynamically imported module/i.test(message) ||
    /importing a module script failed/i.test(message) ||
    /dynamically imported module/i.test(message) ||
    (/unexpected token/i.test(message) && /<!doctype/i.test(message))
  )
}

function hasReloadedRecently() {
  try {
    const lastReload = Number(sessionStorage.getItem(RELOAD_FLAG_KEY) || 0)
    return Date.now() - lastReload < RELOAD_COOLDOWN_MS
  } catch {
    // sessionStorage non disponibile (es. navigazione privata): niente retry automatico.
    return true
  }
}

function markReloaded() {
  try {
    sessionStorage.setItem(RELOAD_FLAG_KEY, String(Date.now()))
  } catch {
    /* noop */
  }
}

export default function RouteErrorBoundary() {
  const error = useRouteError()
  const stale = isStaleDeploymentError(error)
  const [reloading, setReloading] = useState(() => stale && !hasReloadedRecently())

  useEffect(() => {
    if (!reloading) return
    markReloaded()
    window.location.reload()
  }, [reloading])

  if (reloading) return null

  return (
    <div className="flex min-h-screen items-center justify-center py-20">
      <div className="container-page text-center">
        <p className="eyebrow">Ops</p>
        <h1 className="mt-3 text-fluid-3xl font-bold text-ink-950">Qualcosa è andato storto.</h1>
        <p className="mt-4 text-fluid-base text-ink-600">
          {stale
            ? "È stata pubblicata una nuova versione del sito. Ricarica la pagina per continuare."
            : 'Riprova a ricaricare la pagina; se il problema persiste, torna alla home.'}
        </p>
        <button type="button" onClick={() => window.location.reload()} className="btn-primary mt-8 inline-flex">
          Ricarica la pagina
        </button>
      </div>
    </div>
  )
}
