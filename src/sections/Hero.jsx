import { Link } from 'react-router-dom'
import { useContentBlock, usePublicContent } from '../hooks/usePublicContent.jsx'
import { getProjectStatusLabel } from '../utils/projectPresentation.js'

function isPlaceholderImage(src) {
  return !src || (src.startsWith('/projects/') && src.endsWith('.svg'))
}

export default function Hero() {
  const { data: hero } = useContentBlock('hero')
  const { projects } = usePublicContent()
  const visualProjects = projects.filter((project) => project.featured).slice(0, 3)

  return (
    <section className="border-b border-ink-800/10 bg-paper-50">
      <div className="container-page grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.85fr)] lg:items-center lg:gap-16 lg:py-28">
        <div>
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

        {visualProjects.length > 0 && (
          <div aria-label="Progetti selezionati" className="relative mx-auto w-full max-w-lg lg:mx-0">
            <div className="absolute -inset-3 rounded-[2rem] bg-accent-50/70" aria-hidden="true" />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {visualProjects.map((project, index) => (
                <Link
                  key={project.slug}
                  to={`/progetti/${project.slug}`}
                  className={`card group overflow-hidden ${index === 0 ? 'sm:col-span-2' : ''}`}
                >
                  <div className={`${index === 0 ? 'aspect-[16/8]' : 'aspect-[16/10]'} overflow-hidden bg-paper-200`}>
                    {isPlaceholderImage(project.coverImage) ? (
                      <div className="flex h-full items-end bg-gradient-to-br from-accent-100 via-paper-100 to-paper-300 p-4">
                        <span className="text-fluid-xs font-semibold uppercase tracking-[0.1em] text-accent-900">
                          {project.title}
                        </span>
                      </div>
                    ) : (
                      <img
                        src={project.coverImage}
                        alt={`Immagine del progetto ${project.title}`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 ? 'high' : 'auto'}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <div className="space-y-2 px-4 py-3">
                    <span className="block break-words text-fluid-sm font-semibold text-ink-950">{project.title}</span>
                    <span className="status-badge inline-flex">{getProjectStatusLabel(project.status)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
