import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import CTASection from '../components/CTASection.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function Solutions() {
  const { data } = useContentBlock('solutions')
  const solutions = data.items || []
  return (
    <>
      <Seo
        title="Soluzioni"
        description="Web app, gestionali, automazioni e AI applicata: soluzioni digitali costruite a partire dai problemi concreti della tua attività."
        path="/soluzioni"
      />

      <section className="border-b border-ink-800/10 py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Soluzioni"
            title="Tre modi per semplificare il tuo lavoro"
            description="Non vendo tecnologie: costruiamo la soluzione più adatta al problema che hai davanti."
            as="h1"
          />
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2">
          {solutions.map((solution) => (
            <article key={solution.id} className="card flex h-full flex-col p-6 sm:p-8">
              <h2 className="text-fluid-xl font-bold text-ink-950">{solution.title}</h2>
              {solution.audience && <p className="mt-3 text-fluid-base font-medium text-ink-800">{solution.audience}</p>}
              {solution.problem && (
                <div className="mt-6 border-t border-ink-800/10 pt-5">
                  <h3 className="text-fluid-sm font-semibold uppercase tracking-[0.08em] text-accent-600">Problema tipico</h3>
                  <p className="mt-2 text-fluid-base text-ink-600">{solution.problem}</p>
                </div>
              )}
              <p className="mt-5 text-fluid-base text-ink-600">{solution.description}</p>

              {solution.deliverables?.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-fluid-sm font-semibold uppercase tracking-[0.08em] text-accent-600">Cosa si può consegnare</h3>
                  <ul className="mt-3 space-y-2 text-fluid-sm text-ink-600">
                    {solution.deliverables.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
              )}

              {solution.examples?.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {solution.examples.map((example) => <li key={example} className="tag">{example}</li>)}
                </ul>
              )}

              {solution.howStart && (
                <div className="mt-auto border-t border-ink-800/10 pt-5">
                  <h3 className="text-fluid-sm font-semibold uppercase tracking-[0.08em] text-accent-600">Come si parte</h3>
                  <p className="mt-2 text-fluid-sm text-ink-600">{solution.howStart}</p>
                </div>
              )}
            </article>
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
