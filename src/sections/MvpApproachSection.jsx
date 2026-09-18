import SectionHeading from '../components/SectionHeading.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function MvpApproachSection() {
  const { data: mvpApproach } = useContentBlock('mvpApproach')
  return (
    <section className="bg-paper-100 py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={mvpApproach.eyebrow} title={mvpApproach.title} description={mvpApproach.description} />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mvpApproach.principles.map((principle) => (
            <div key={principle.title} className="rounded-2xl border border-ink-800/10 bg-paper-50 p-6">
              <h3 className="text-fluid-base font-semibold text-ink-950">{principle.title}</h3>
              <p className="mt-2 text-fluid-sm text-ink-600">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
