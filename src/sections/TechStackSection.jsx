import SectionHeading from '../components/SectionHeading.jsx'
import TechStack from '../components/TechStack.jsx'
import techStack from '../data/techStack.js'

export default function TechStackSection() {
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
