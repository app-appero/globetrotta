import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CTASection from '../components/CTASection.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function Solutions() {
  const { data } = useContentBlock('solutions')
  const solutions = data.items || []
  return (
    <>
      <Seo
        title="Soluzioni"
        description="Cosa posso costruire per la tua attività: prodotti digitali, strumenti su misura, automazioni e soluzioni AI."
        path="/soluzioni"
      />

      <section className="border-b border-ink-800/10 py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Soluzioni"
            title="Cosa possiamo costruire"
            description="Non vendo tecnologie: costruisco soluzioni pensate per il problema che hai davanti."
          />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2">
          {solutions.map((solution) => (
            <ServiceCard key={solution.id} {...solution} />
          ))}
        </div>
      </section>

      <CTASection
        title="Non sai da quale soluzione partire?"
        description="Va bene così. Raccontami la tua situazione e capiamo insieme la strada migliore."
        primaryLabel="Parliamone"
        primaryTo="/contatti"
      />
    </>
  )
}
