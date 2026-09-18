import SectionHeading from '../components/SectionHeading.jsx'
import ProcessStep from '../components/ProcessStep.jsx'
import process from '../data/process.js'

export default function ProcessSection() {
  return (
    <section className="bg-paper-100 py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow="Metodo" title="Come lavoro" />

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  )
}
