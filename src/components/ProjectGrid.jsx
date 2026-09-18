import ProjectCard from './ProjectCard.jsx'

export default function ProjectGrid({ projects, emptyMessage = 'Nessun progetto trovato per questa categoria.' }) {
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
