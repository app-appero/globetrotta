import Seo from '../components/Seo.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'
import fallbackPrivacy from '../data/privacy.js'

export default function Privacy() {
  const { data } = useContentBlock('privacy')
  const privacy = {
    ...fallbackPrivacy,
    ...data,
    sections: data.sections || fallbackPrivacy.sections,
  }

  return (
    <>
      <Seo
        title={privacy.title || 'Privacy Policy'}
        description={privacy.seoDescription || 'Informazioni sul trattamento dei dati personali e sui canali di contatto di GlobeTrotta.'}
        path="/privacy"
      />

      <section className="py-14 sm:py-20">
        <div className="container-page max-w-4xl">
          <p className="eyebrow">{privacy.eyebrow}</p>
          <h1 className="mt-4 text-fluid-4xl font-extrabold tracking-tight text-ink-950">{privacy.title}</h1>
          <p className="mt-6 max-w-prose text-fluid-lg text-ink-600">{privacy.intro}</p>

          <div className="mt-12 space-y-10">
            {privacy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-fluid-2xl font-bold tracking-tight text-ink-950">{section.title}</h2>
                <div className="mt-3 space-y-3 text-fluid-base leading-7 text-ink-700">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-12 border-t border-ink-800/10 pt-6 text-fluid-sm text-ink-500">
            Ultimo aggiornamento: {privacy.updatedAt}
          </p>
        </div>
      </section>
    </>
  )
}
