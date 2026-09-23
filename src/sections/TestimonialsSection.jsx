import SectionHeading from '../components/SectionHeading.jsx'
import TestimonialCard from '../components/TestimonialCard.jsx'
import { usePublicContent } from '../hooks/usePublicContent.jsx'
import { isFeaturedTestimonial } from '../utils/testimonials.js'

export default function TestimonialsSection() {
  const { testimonials } = usePublicContent()
  const featuredTestimonials = testimonials.filter(isFeaturedTestimonial)

  // Nessuna testimonianza approvata e in evidenza: niente sezione, niente
  // stato vuoto — la sezione compare solo quando ha davvero qualcosa da mostrare.
  if (featuredTestimonials.length === 0) return null

  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonianze"
          title="Cosa dicono le persone con cui ho lavorato"
          description="Esperienze e risultati raccontati direttamente da chi ha trasformato un’esigenza in un progetto concreto."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  )
}
