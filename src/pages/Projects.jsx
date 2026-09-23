import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectFilters from '../components/ProjectFilters.jsx'
import ProjectGrid from '../components/ProjectGrid.jsx'
import { useProjectFilters } from '../hooks/useProjectFilters.js'
import { usePublicContent } from '../hooks/usePublicContent.jsx'

export default function Projects() {
  const { projects: allProjects, loading, error } = usePublicContent()
  const categories = ['Tutti', ...Array.from(new Set(allProjects.flatMap((project) => project.category))).sort()]
  const { activeCategory, setActiveCategory, filteredProjects } = useProjectFilters(allProjects, categories)

  return (
    <>
      <Seo
        title="Progetti"
        description="Case study di applicazioni, strumenti su misura, automazioni e soluzioni AI sviluppate da Rosario Trotta."
        path="/progetti"
      />

      <section className="border-b border-ink-800/10 py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Portfolio"
            title="Progetti selezionati"
            description="Cosa fanno questi progetti, per chi, e quale problema risolvono — prima ancora di come sono stati costruiti."
            as="h1"
          />
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="container-page">
          <ProjectFilters categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />

          {error && !loading && (
            <p role="alert" className="mt-6 rounded-xl border border-ink-800/10 bg-paper-100 px-4 py-3 text-fluid-sm text-ink-600">
              Non riusciamo ad aggiornare l’elenco dei progetti in questo momento. Potresti vedere dati non aggiornati.
            </p>
          )}

          <div className="mt-8">
            <ProjectGrid projects={filteredProjects} loading={loading} />
          </div>
        </div>
      </section>
    </>
  )
}
