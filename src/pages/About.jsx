import Seo from '../components/Seo.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import CTASection from '../components/CTASection.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function About() {
  const { data: about } = useContentBlock('about')
  return (
    <>
      <Seo
        title="Chi sono"
        description="Rosario Trotta, Full-Stack & AI Developer: cosa faccio e come posso essere utile alla tua attività."
        path="/chi-sono"
      />

      <section className="py-14 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
          <div>
            <img
              src={about.photo}
              alt={`Ritratto di ${about.name}`}
              className="aspect-square w-full max-w-xs rounded-2xl object-cover"
            />
            <SocialLinks className="mt-6" />
          </div>

          <div>
            <p className="eyebrow">{about.eyebrow}</p>
            <h1 className="mt-3 text-fluid-3xl font-bold tracking-tight text-ink-950">{about.name}</h1>
            <p className="mt-1 text-fluid-lg text-ink-500">{about.role}</p>

            <div className="mt-8 max-w-prose space-y-5 text-fluid-base text-ink-600">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="text-fluid-sm text-ink-500">{about.cvNote}</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection title={about.ctaTitle} description={about.ctaDescription} primaryLabel="Parliamone" primaryTo="/contatti" />
    </>
  )
}
