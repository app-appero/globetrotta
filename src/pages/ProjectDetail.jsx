import { useParams, Link, Navigate } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import ProjectGallery from '../components/ProjectGallery.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import { usePublicContent } from '../hooks/usePublicContent.jsx'

function DetailSection({ title, children }) {
  return (
    <section className="border-t border-ink-800/10 py-10 sm:py-12">
      <h2 className="text-fluid-xl font-bold text-ink-950">{title}</h2>
      <div className="mt-4 max-w-prose text-fluid-base text-ink-600">{children}</div>
    </section>
  )
}

function DetailList({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-fluid-base text-ink-600">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects } = usePublicContent()
  const project = projects.find((item) => item.slug === slug)

  if (!project) {
    return <Navigate to="/progetti" replace />
  }

  const relatedProjects = projects
    .filter((item) => item.slug !== project.slug && item.category.some((category) => project.category.includes(category)))
    .slice(0, 2)

  return (
    <>
      <Seo title={project.seoTitle} description={project.seoDescription} path={`/progetti/${project.slug}`} image={project.coverImage} type="article" />

      <article>
        <header className="border-b border-ink-800/10 bg-paper-100">
          <div className="container-page py-12 sm:py-16">
            <Link to="/progetti" className="text-fluid-sm font-medium text-ink-600 hover:text-ink-950">
              ← Tutti i progetti
            </Link>

            <p className="eyebrow mt-6">{project.category.join(' · ')}</p>
            <h1 className="mt-3 max-w-3xl text-fluid-4xl font-extrabold leading-tight tracking-tight text-ink-950">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-fluid-lg text-ink-600">{project.subtitle}</p>

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-fluid-sm">
              <div>
                <dt className="text-ink-500">Anno</dt>
                <dd className="font-medium text-ink-900">{project.year}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Stato</dt>
                <dd className="font-medium text-ink-900">{project.status}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Ruolo</dt>
                <dd className="font-medium text-ink-900">{project.role}</dd>
              </div>
            </dl>

            {(project.githubUrl || project.liveUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                    Vedi la demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">
                    Codice su GitHub
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <div className="aspect-[16/9] w-full bg-paper-200">
          <img
            src={project.coverImage}
            alt={`Anteprima del progetto ${project.title}`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="container-page">
          <DetailSection title="Overview">
            <p>{project.description}</p>
          </DetailSection>

          <DetailSection title="Il problema">
            <p>{project.problem}</p>
          </DetailSection>

          {project.context && (
            <DetailSection title="Contesto">
              <p>{project.context}</p>
            </DetailSection>
          )}

          <DetailSection title="La soluzione">
            <p>{project.solution}</p>
          </DetailSection>

          <DetailSection title="Il mio ruolo">
            <p>{project.myRole}</p>
          </DetailSection>

          <DetailSection title="Funzionalità principali">
            <DetailList items={project.keyFeatures} />
          </DetailSection>

          <DetailSection title="Business value">
            <DetailList items={project.businessValue} />
          </DetailSection>

          {project.architecture && (
            <DetailSection title="Architettura tecnica">
              <p>{project.architecture}</p>
            </DetailSection>
          )}

          {project.challenges?.length > 0 && (
            <DetailSection title="Challenges">
              <DetailList items={project.challenges} />
            </DetailSection>
          )}

          <DetailSection title="Risultato">
            <DetailList items={project.results} />
          </DetailSection>

          <DetailSection title="Tech stack">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-ink-800/10 px-3 py-1.5 text-fluid-sm text-ink-800">
                  {tech}
                </span>
              ))}
            </div>
          </DetailSection>

          {project.skills?.length > 0 && (
            <DetailSection title="Cosa dimostra questo progetto">
              <DetailList items={project.skills} />
            </DetailSection>
          )}

          {(project.gallery?.length > 0 || project.demoVideoUrl) && (
            <section className="border-t border-ink-800/10 py-10 sm:py-12">
              <h2 className="text-fluid-xl font-bold text-ink-950">Galleria</h2>
              <div className="mt-6">
                <ProjectGallery gallery={project.gallery} demoVideoUrl={project.demoVideoUrl} />
              </div>
            </section>
          )}
        </div>

        {relatedProjects.length > 0 && (
          <section className="border-t border-ink-800/10 bg-paper-100 py-16 sm:py-20">
            <div className="container-page">
              <h2 className="text-fluid-2xl font-bold text-ink-950">Progetti correlati</h2>
              <div className="mt-8">
                <ProjectGrid projects={relatedProjects} />
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
