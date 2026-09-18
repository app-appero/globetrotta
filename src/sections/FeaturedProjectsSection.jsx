import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import { usePublicContent } from '../hooks/usePublicContent.jsx'

export default function FeaturedProjectsSection() {
  const { projects } = usePublicContent()
  const featuredProjects = projects.filter((project) => project.featured)

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Portfolio" title="Progetti selezionati" />
          <Link to="/progetti" className="shrink-0 text-fluid-sm font-semibold text-ink-950 hover:text-accent-600">
            Vedi tutti i progetti →
          </Link>
        </div>

        <div className="mt-10">
          <ProjectGrid projects={featuredProjects} />
        </div>
      </div>
    </section>
  )
}
