import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function NewBusinessSection() {
  const { data: newBusiness } = useContentBlock('newBusiness')
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <SectionHeading eyebrow={newBusiness.eyebrow} title={newBusiness.title} />
            {newBusiness.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 max-w-prose text-fluid-base text-ink-600">
                {paragraph}
              </p>
            ))}
            <Link to="/contatti" className="btn-primary mt-8 w-full sm:w-auto">
              {newBusiness.ctaLabel}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {newBusiness.paths.map((path) => (
              <div key={path.title} className="rounded-2xl border border-ink-800/10 bg-paper-100 p-6 sm:p-7">
                <h3 className="text-fluid-lg font-semibold text-ink-950">{path.title}</h3>
                <p className="mt-2 text-fluid-base text-ink-600">{path.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
