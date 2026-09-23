import ProjectCard from './ProjectCard.jsx'
import ProjectCardSkeleton from './ProjectCardSkeleton.jsx'

const SKELETON_COUNT = 6

export default function ProjectGrid({ projects, loading = false, emptyMessage = 'Nessun progetto trovato per questa categoria.' }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">Caricamento progetti…</span>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (projects.length === 0) {
    return <p className="py-12 text-center text-fluid-base text-ink-500">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
