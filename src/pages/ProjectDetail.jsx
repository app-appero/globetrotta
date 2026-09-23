import { useParams, Link, Navigate } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import ProjectGallery from '../components/ProjectGallery.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import { usePublicContent } from '../hooks/usePublicContent.jsx'
import { getProjectOriginLabel, getProjectStatusLabel } from '../utils/projectPresentation.js'

// Etichette delle sezioni della scheda progetto, centralizzate qui in modo
// che tutti i progetti (guidati dagli stessi dati) mostrino sempre lo stesso
// testo in italiano, senza doverlo ripetere ad ogni <DetailSection>.
const SECTION_LABELS = {
  overview: 'Panoramica',
  problem: 'Il problema',
  context: 'Contesto',
  solution: 'La soluzione',
  myRole: 'Il mio ruolo',
  keyFeatures: 'Funzionalità principali',
  businessValue: 'Valore generato',
  architecture: 'Architettura tecnica',
  challenges: 'Sfide affrontate',
  results: 'Risultato',
  techStack: 'Tecnologie utilizzate',
  skills: 'Cosa dimostra questo progetto',
  gallery: 'Galleria',
  relatedProjects: 'Progetti correlati',
}

// Stato "visibile" della pagina, derivato da usePublicContent(). "idle" non
// si verifica mai in pratica in questa architettura (la sottoscrizione a
// Firestore parte subito, in modo sincrono, all'interno del provider), ma è
// elencato per chiarezza sugli stati gestiti.
function getProjectDetailStatus({ loading, error, project }) {
  if (loading) return 'loading'
  if (project) return 'success'
  if (error) return 'error'
  return 'not-found'
}

function isPlaceholderImage(src) {
  return !src || (src.startsWith('/projects/') && src.endsWith('.svg'))
}

function hasAvailableGallery(project) {
  return (project.gallery || []).some((image) => !isPlaceholderImage(image.src))
}

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

function ProjectDetailStatus({ eyebrow, title, description, action }) {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="container-page text-center">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 text-fluid-2xl font-bold text-ink-950">{title}</h1>
        <p className="mt-4 text-fluid-base text-ink-600">{description}</p>
        {action}
      </div>
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const { projects, loading, error, retry } = usePublicContent()
  const project = projects.find((item) => item.slug === slug)
  const status = getProjectDetailStatus({ loading, error, project })

  // Al primo caricamento (URL diretto, refresh, nuova scheda) Firestore non ha
  // ancora risposto: "projects" è ancora vuoto qui. Senza questo controllo il
  // progetto risulterebbe erroneamente "non esistente" e si finirebbe
  // rimandati a /progetti prima ancora che i dati arrivino.
  if (status === 'loading') {
    return (
      <ProjectDetailStatus
        eyebrow="Caricamento"
        title="Caricamento del progetto…"
        description="Un attimo, stiamo recuperando i dati del progetto."
      />
    )
  }

  if (status === 'error') {
    return (
      <ProjectDetailStatus
        eyebrow="Errore"
        title="Non riusciamo a caricare questo progetto."
        description="Si è verificato un problema di connessione. Riprova tra qualche istante."
        action={
          <button type="button" onClick={retry} className="btn-primary mt-8 inline-flex">
            Riprova
          </button>
        }
      />
    )
  }

  if (status === 'not-found') {
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
                <dt className="text-ink-500">Tipologia</dt>
                <dd className="font-medium text-ink-900">{getProjectOriginLabel(project.origin)}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Anno</dt>
                <dd className="font-medium text-ink-900">{project.year}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Stato</dt>
                <dd className="font-medium text-ink-900">{getProjectStatusLabel(project.status)}</dd>
              </div>
              <div>
                <dt className="text-ink-500">Ruolo</dt>
                <dd className="font-medium text-ink-900">{project.role}</dd>
              </div>
            </dl>
            {(project.mobileBrowser || project.mobileApp) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.mobileBrowser && <span className="tag">Browser mobile</span>}
                {project.mobileApp && <span className="tag">App mobile</span>}
              </div>
            )}

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

        <div className="container-page">
          <DetailSection title={SECTION_LABELS.overview}>
            <p>{project.description}</p>
          </DetailSection>

          <DetailSection title={SECTION_LABELS.problem}>
            <p>{project.problem}</p>
          </DetailSection>

          {project.context && (
            <DetailSection title={SECTION_LABELS.context}>
              <p>{project.context}</p>
            </DetailSection>
          )}

          <DetailSection title={SECTION_LABELS.solution}>
            <p>{project.solution}</p>
          </DetailSection>

          <DetailSection title={SECTION_LABELS.myRole}>
            <p>{project.myRole}</p>
          </DetailSection>

          <DetailSection title={SECTION_LABELS.keyFeatures}>
            <DetailList items={project.keyFeatures} />
          </DetailSection>

          <DetailSection title={SECTION_LABELS.businessValue}>
            <DetailList items={project.businessValue} />
          </DetailSection>

          {project.architecture && (
            <DetailSection title={SECTION_LABELS.architecture}>
              <p>{project.architecture}</p>
            </DetailSection>
          )}

          {project.challenges?.length > 0 && (
            <DetailSection title={SECTION_LABELS.challenges}>
              <DetailList items={project.challenges} />
            </DetailSection>
          )}

          <DetailSection title={SECTION_LABELS.results}>
            <DetailList items={project.results} />
          </DetailSection>

          <DetailSection title={SECTION_LABELS.techStack}>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-ink-800/10 px-3 py-1.5 text-fluid-sm text-ink-800">
                  {tech}
                </span>
              ))}
            </div>
          </DetailSection>

          {project.skills?.length > 0 && (
            <DetailSection title={SECTION_LABELS.skills}>
              <DetailList items={project.skills} />
            </DetailSection>
          )}

          {(hasAvailableGallery(project) || project.demoVideoUrl) && (
            <section className="border-t border-ink-800/10 py-10 sm:py-12">
              <h2 className="text-fluid-xl font-bold text-ink-950">{SECTION_LABELS.gallery}</h2>
              <div className="mt-6">
                <ProjectGallery gallery={project.gallery} demoVideoUrl={project.demoVideoUrl} />
              </div>
            </section>
          )}
        </div>

        {relatedProjects.length > 0 && (
          <section className="border-t border-ink-800/10 bg-paper-100 py-16 sm:py-20">
            <div className="container-page">
              <h2 className="text-fluid-2xl font-bold text-ink-950">{SECTION_LABELS.relatedProjects}</h2>
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
