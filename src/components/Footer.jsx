import { Link } from 'react-router-dom'
import SocialLinks from './SocialLinks.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

const FOOTER_LINKS = [
  { to: '/progetti', label: 'Progetti' },
  { to: '/soluzioni', label: 'Soluzioni' },
  { to: '/chi-sono', label: 'Chi sono' },
  { to: '/contatti', label: 'Contatti' },
]

export default function Footer() {
  const { data: site } = useContentBlock('site')
  return (
    <footer className="border-t border-ink-800/10 bg-paper-100">
      <div className="container-page flex flex-col gap-10 py-12 sm:py-16 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <p className="text-fluid-base font-bold tracking-tight text-ink-950">{site.name}</p>
          <p className="mt-2 text-fluid-sm text-ink-600">
            {site.author}
            <br />
            {site.role}
          </p>
        </div>

        <nav aria-label="Link footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-fluid-sm text-ink-700 hover:text-ink-950">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>

      <div className="border-t border-ink-800/10">
        <div className="container-page py-5">
          <p className="text-fluid-xs text-ink-500">
            © {new Date().getFullYear()} {site.name} — {site.author}. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  )
}
