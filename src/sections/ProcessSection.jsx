import SectionHeading from '../components/SectionHeading.jsx'
import ProcessStep from '../components/ProcessStep.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function ProcessSection() {
  const { data } = useContentBlock('process')
  const { data: mvpApproach } = useContentBlock('mvpApproach')
  const process = data.items || []
  return (
    <section className="bg-paper-100 py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          eyebrow="Metodo"
          title="Come lavoro"
          description="Partiamo da ciò che serve davvero, costruiamo una prima soluzione utile e la facciamo evolvere quando serve."
        />

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step) => (
            <ProcessStep key={step.number} {...step} />
          ))}
        </div>

        {mvpApproach.principles?.length > 0 && (
          <div className="mt-12 border-t border-ink-800/10 pt-10">
            <p className="eyebrow">{mvpApproach.eyebrow}</p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {mvpApproach.principles.map((principle) => (
                <div key={principle.title} className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6">
                  <h3 className="text-fluid-base font-semibold text-ink-950">{principle.title}</h3>
                  <p className="mt-2 text-fluid-sm text-ink-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
