import { Link } from 'react-router-dom'
import hero from '../data/hero.js'

export default function Hero() {
  return (
    <section className="border-b border-ink-800/10 bg-paper-50">
      <div className="container-page py-16 sm:py-24 lg:py-28">
        <p className="eyebrow">{hero.eyebrow}</p>

        <h1 className="mt-4 max-w-3xl text-fluid-5xl font-extrabold leading-[1.08] tracking-tight text-ink-950">
          {hero.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-fluid-lg text-ink-600">{hero.subheadline}</p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/contatti" className="btn-primary w-full sm:w-auto">
            {hero.ctaPrimaryLabel}
          </Link>
          <Link to="/progetti" className="btn-secondary w-full sm:w-auto">
            {hero.ctaSecondaryLabel}
          </Link>
        </div>

        <p className="mt-6 text-fluid-sm text-ink-500">{hero.microCopy}</p>
      </div>
    </section>
  )
}
