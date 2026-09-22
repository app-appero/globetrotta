import { Link } from 'react-router-dom'

export default function CTASection({
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryHref,
}) {
  return (
    <section className="bg-ink-950">
      <div className="container-page py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-fluid-3xl font-bold tracking-tight text-paper-50">{title}</h2>
          {description && <p className="mt-4 text-fluid-lg text-ink-400">{description}</p>}

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to={primaryTo}
              className="btn w-full bg-paper-50 text-ink-950 hover:bg-accent-500 hover:text-paper-50 sm:w-auto"
            >
              {primaryLabel}
            </Link>
            {secondaryLabel && (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noreferrer"
                className="btn-on-dark w-full sm:w-auto"
              >
                {secondaryLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
