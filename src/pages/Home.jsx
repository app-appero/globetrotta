import Seo from '../components/Seo.jsx'
import Hero from '../sections/Hero.jsx'
import ProblemsSection from '../sections/ProblemsSection.jsx'
import SolutionsSection from '../sections/SolutionsSection.jsx'
import NewBusinessSection from '../sections/NewBusinessSection.jsx'
import MvpApproachSection from '../sections/MvpApproachSection.jsx'
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection.jsx'
import ProcessSection from '../sections/ProcessSection.jsx'
import TechStackSection from '../sections/TechStackSection.jsx'
import FinalCtaSection from '../sections/FinalCtaSection.jsx'

export default function Home() {
  return (
    <>
      <Seo
        title="GlobeTrotta — Rosario Trotta, Full-Stack & AI Developer"
        description="Aiuto nuove attività, professionisti e piccole imprese a sviluppare applicazioni, strumenti digitali, automazioni e soluzioni AI pensate per esigenze concrete."
        path="/"
      />
      <Hero />
      <ProblemsSection />
      <SolutionsSection />
      <NewBusinessSection />
      <MvpApproachSection />
      <FeaturedProjectsSection />
      <ProcessSection />
      <TechStackSection />
      <FinalCtaSection />
    </>
  )
}
