import Seo from '../components/Seo.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import CTASection from '../components/CTASection.jsx'
import PlaceholderVisual from '../components/PlaceholderVisual.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

function isPlaceholderPhoto(src) {
  return !src || src === '/profile-placeholder.svg'
}

export default function About() {
  const { data: about } = useContentBlock('about')
  const { data: site } = useContentBlock('site')
  const photo = isPlaceholderPhoto(about.photo) ? site.assets?.profilePhoto || about.photo : about.photo
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
            {isPlaceholderPhoto(photo) ? (
              <PlaceholderVisual label="Foto non disponibile" className="aspect-square w-full max-w-xs rounded-2xl" />
            ) : (
              <img src={photo} alt={`Ritratto di ${about.name}`} decoding="async" className="aspect-square w-full max-w-xs rounded-2xl object-cover" />
            )}
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

      <section className="bg-paper-100 py-14 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {about.approach && (
            <div>
              <h2 className="text-fluid-2xl font-bold tracking-tight text-ink-950">{about.approachTitle || 'Come lavoro'}</h2>
              <p className="mt-4 max-w-prose text-fluid-base text-ink-600">{about.approach}</p>
            </div>
          )}
          {about.focusAreas?.length > 0 && (
            <div>
              <h2 className="text-fluid-2xl font-bold tracking-tight text-ink-950">{about.focusTitle || 'Ambiti di lavoro'}</h2>
              <ul className="mt-5 space-y-3">
                {about.focusAreas.map((area) => (
                  <li key={area} className="flex gap-3 text-fluid-base text-ink-600">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" aria-hidden="true" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <CTASection title={about.ctaTitle} description={about.ctaDescription} primaryLabel="Parliamone" primaryTo="/contatti" />
    </>
  )
}
