import { Link } from 'react-router-dom'
import PlaceholderVisual from './PlaceholderVisual.jsx'
import { getProjectOriginLabel, getProjectStatusLabel } from '../utils/projectPresentation.js'

function isPlaceholderImage(src) {
  return !src || src === '/profile-placeholder.svg' || (src.startsWith('/projects/') && src.endsWith('.svg'))
}

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/progetti/${project.slug}`}
      className="card group flex h-full flex-col overflow-hidden"
    >
      <div className="aspect-[16/9] w-full overflow-hidden bg-paper-200 p-2">
        {isPlaceholderImage(project.coverImage) ? (
          <PlaceholderVisual label={project.title} className="rounded-lg" />
        ) : (
          <img
            src={project.coverImage}
            alt={`Immagine del progetto ${project.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-lg object-cover transition-transform duration-300 ease-smooth group-hover:scale-[1.03]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-fluid-xs font-semibold uppercase tracking-[0.1em] text-accent-600">
          {project.category.join(' · ')}
        </p>
        <h3 className="mt-2 text-fluid-xl font-bold text-ink-950">{project.title}</h3>
        <p className="mt-2 flex-1 text-fluid-base text-ink-600">{project.shortDescription}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="status-badge">{getProjectOriginLabel(project.origin)}</span>
          <span className="tag">{getProjectStatusLabel(project.status)}</span>
          {project.mobileBrowser && <span className="tag">Browser mobile</span>}
          {project.mobileApp && <span className="tag">App mobile</span>}
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>

        <span className="mt-6 inline-flex items-center gap-1.5 text-fluid-sm font-semibold text-ink-950">
          Scopri il progetto
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
