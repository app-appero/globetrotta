import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import MobileMenu from './MobileMenu.jsx'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/progetti', label: 'Progetti' },
  { to: '/soluzioni', label: 'Soluzioni' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className="sticky top-0 z-30 border-b border-ink-800/10 bg-paper-50/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between sm:h-20">
        <Link to="/" className="text-fluid-base font-bold tracking-tight text-ink-950">
          GlobeTrotta
        </Link>

        <nav aria-label="Menu principale" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-fluid-sm font-medium transition-colors duration-200 ease-smooth ${
                  isActive ? 'text-accent-600' : 'text-ink-700 hover:text-ink-950'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/contatti" className="btn-primary hidden md:inline-flex">
            Parliamo del tuo progetto
          </Link>

          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Apri menu"
            aria-expanded={isMenuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-900 hover:bg-ink-950/5 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileMenu links={NAV_LINKS} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
