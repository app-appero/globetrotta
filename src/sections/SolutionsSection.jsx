import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import solutions from '../data/solutions.js'

export default function SolutionsSection() {
  return (
    <section className="bg-paper-100 py-16 sm:py-24">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Soluzioni" title="Cosa possiamo costruire" />
          <Link to="/soluzioni" className="shrink-0 text-fluid-sm font-semibold text-ink-950 hover:text-accent-600">
            Scopri tutte le soluzioni →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <ServiceCard key={solution.id} {...solution} />
          ))}
        </div>
      </div>
    </section>
  )
}
