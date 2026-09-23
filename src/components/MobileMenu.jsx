import { createPortal } from 'react-dom'
import { useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

// Montato in portal su document.body: l'header è "sticky" con backdrop-blur,
// e backdrop-blur (come filter/transform) crea un nuovo containing block per
// i discendenti in position:fixed, "intrappolando" il drawer nell'altezza
// dell'header invece di coprire l'intero viewport. Il portal evita il problema.
export default function MobileMenu({ links, isOpen, onClose }) {
  const closeButtonRef = useRef(null)
  const { data: hero } = useContentBlock('hero')

  useEffect(() => {
    if (!isOpen) return undefined
    closeButtonRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (typeof document === 'undefined' || !isOpen) return null

  return createPortal(
    <div
      className={`fixed inset-0 z-40 md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden="false"
    >
      <div
        className={`absolute inset-0 bg-ink-950/40 transition-opacity duration-300 ease-smooth ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <nav
        aria-label="Menu di navigazione"
        aria-modal="true"
        role="dialog"
        className={`absolute right-0 top-0 flex h-full w-[min(85vw,360px)] flex-col bg-paper-50 px-6 pb-8 pt-6 shadow-card-hover transition-transform duration-300 ease-smooth ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-fluid-sm font-semibold tracking-tight">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi menu"
            ref={closeButtonRef}
            className="flex h-11 w-11 items-center justify-center rounded-full text-ink-700 hover:bg-ink-950/5"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="mt-10 flex flex-col gap-1">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-4 text-fluid-lg font-medium transition-colors ${
                    isActive ? 'text-accent-600' : 'text-ink-900 hover:bg-ink-950/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <Link to="/contatti" onClick={onClose} className="btn-primary mt-auto w-full">
          {hero.ctaPrimaryLabel}
        </Link>
      </nav>
    </div>,
    document.body,
  )
}
