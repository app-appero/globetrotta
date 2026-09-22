import Seo from '../components/Seo.jsx'
import Hero from '../sections/Hero.jsx'
import ProblemsSection from '../sections/ProblemsSection.jsx'
import SolutionsSection from '../sections/SolutionsSection.jsx'
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection.jsx'
import ProcessSection from '../sections/ProcessSection.jsx'
import TechStackSection from '../sections/TechStackSection.jsx'
import FinalCtaSection from '../sections/FinalCtaSection.jsx'

export default function Home() {
  return (
    <>
      <Seo
        title="GlobeTrotta — Rosario Trotta, Full-Stack & AI Developer"
        description="Aiuto professionisti, nuove attività e piccole imprese a trasformare problemi operativi e idee digitali in strumenti web, automazioni e soluzioni AI concrete."
        path="/"
      />
      <Hero />
      <ProblemsSection />
      <FeaturedProjectsSection />
      <SolutionsSection />
      <ProcessSection />
      <TechStackSection />
      <FinalCtaSection />
    </>
  )
}
