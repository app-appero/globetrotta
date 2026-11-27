import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'
import { useInboxAlerts } from './InboxAlerts.jsx'
import { CONTENT_BLOCKS } from './schemas/contentBlocks.js'

function navClass({ isActive }) {
  return `whitespace-nowrap rounded-xl px-3 py-2 text-fluid-sm font-medium transition-colors ${
    isActive ? 'btn-ink' : 'text-ink-700 hover:bg-ink-950/5'
  }`
}

function NavCount({ to, end, label, count }) {
  return (
    <NavLink to={to} end={end} className={navClass}>
      <span className="flex items-center gap-2">
        {label}
        {count > 0 && (
          <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-accent-600 px-1.5 text-[11px] font-semibold leading-none text-white">
            {count > 99 ? '99+' : count}
            <span className="sr-only"> da leggere</span>
          </span>
        )}
      </span>
    </NavLink>
  )
}

export default function AdminLayout() {
  const { logout, user } = useAuth()
  const { newRequests, pendingFeedback, permission, enableNotifications } = useInboxAlerts()

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="border-b border-ink-800/10 bg-paper-50">
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <Link to="/admin" className="truncate text-fluid-sm font-bold text-ink-950">
            GlobeTrotta — Admin
          </Link>
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            {permission === 'default' && (
              <button type="button" onClick={enableNotifications} className="inline-flex min-h-11 items-center text-fluid-xs font-medium text-ink-600 hover:text-ink-950">
                Attiva avvisi
              </button>
            )}
            {permission === 'granted' && (
              <span className="text-fluid-xs text-ink-500">Avvisi attivi</span>
            )}
            <span className="hidden text-fluid-xs text-ink-500 sm:inline">{user?.email}</span>
            <button type="button" onClick={logout} className="text-fluid-xs font-medium text-ink-600 hover:text-ink-950">
              Esci
            </button>
          </div>
        </div>
      </header>

      <div className="container-page flex flex-col gap-8 py-8 lg:flex-row">
        <nav className="flex shrink-0 flex-row flex-wrap gap-2 lg:w-56 lg:flex-col lg:flex-nowrap">
          <NavLink to="/admin" end className={navClass}>
            Pannello
          </NavLink>
          <NavLink to="/admin/progetti" className={navClass}>
            Progetti
          </NavLink>
          <NavCount to="/admin/richieste" label="Richieste" count={newRequests} />
          <NavCount to="/admin/testimonianze" label="Testimonianze" count={pendingFeedback} />
          <p className="mt-4 w-full px-3 text-fluid-xs font-semibold uppercase tracking-wide text-ink-500 lg:mt-6">
            Contenuti
          </p>
          {CONTENT_BLOCKS.map((block) => (
            <NavLink key={block.id} to={`/admin/contenuti/${block.id}`} className={navClass}>
              {block.label}
            </NavLink>
          ))}
        </nav>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
