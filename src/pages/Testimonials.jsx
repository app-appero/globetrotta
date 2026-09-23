import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'
import { usePublicContent } from '../hooks/usePublicContent.jsx'
import { isApprovedTestimonial, sortTestimonials } from '../utils/testimonials.js'

// Pagina pronta ma non ancora collegata dalla navigazione (vedi
// src/components/Navbar.jsx e Footer.jsx, volutamente non modificati):
// resta raggiungibile all'indirizzo /testimonianze e si attiva da sola
// quando ci sono testimonianze approvate da mostrare.
export default function Testimonials() {
  const { testimonials } = usePublicContent()
  const approvedTestimonials = sortTestimonials(testimonials.filter(isApprovedTestimonial))

  return (
    <>
      <Seo
        title="Testimonianze"
        description="Esperienze e risultati raccontati direttamente dai clienti che hanno lavorato con GlobeTrotta."
        path="/testimonianze"
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Testimonianze"
            title="Cosa dicono le persone con cui ho lavorato"
            description="Esperienze e risultati raccontati direttamente da chi ha trasformato un’esigenza in un progetto concreto."
            as="h1"
          />

          {approvedTestimonials.length === 0 ? (
            <p className="mt-10 text-fluid-base text-ink-500">Le prime testimonianze arriveranno presto.</p>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {approvedTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
