import SectionHeading from '../components/SectionHeading.jsx'
import TechStack from '../components/TechStack.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function TechStackSection() {
  const { data: techStack } = useContentBlock('techStack')
  return (
    <section className="py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading eyebrow={techStack.eyebrow} title={techStack.title} description={techStack.description} />

        <div className="mt-10">
          <TechStack />
        </div>
      </div>
    </section>
  )
}
