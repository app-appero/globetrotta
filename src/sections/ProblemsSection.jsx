import SectionHeading from '../components/SectionHeading.jsx'
import ProblemCard from '../components/ProblemCard.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function ProblemsSection() {
  const { data: problems } = useContentBlock('problems')
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={problems.eyebrow} title={problems.title} />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.items.map((problem) => (
            <ProblemCard key={problem.question} {...problem} />
          ))}
        </div>
      </div>
    </section>
  )
}
