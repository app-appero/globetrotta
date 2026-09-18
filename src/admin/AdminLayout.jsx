import { NavLink, Outlet, Link } from 'react-router-dom'
import { useAuth } from './AuthProvider.jsx'
import { CONTENT_BLOCKS } from './schemas/contentBlocks.js'

function navClass({ isActive }) {
  return `whitespace-nowrap rounded-xl px-3 py-2 text-fluid-sm font-medium transition-colors ${
    isActive ? 'bg-ink-950 text-paper-50' : 'text-ink-700 hover:bg-ink-950/5'
  }`
}

export default function AdminLayout() {
  const { logout, user } = useAuth()

  return (
    <div className="min-h-screen bg-paper-100">
      <header className="border-b border-ink-800/10 bg-paper-50">
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/admin" className="text-fluid-sm font-bold text-ink-950">
            GlobeTrotta — Admin
          </Link>
          <div className="flex items-center gap-4">
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
            Dashboard
          </NavLink>
          <NavLink to="/admin/progetti" className={navClass}>
            Progetti
          </NavLink>
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
