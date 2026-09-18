import CTASection from '../components/CTASection.jsx'
import site from '../data/site.js'
import finalCta from '../data/finalCta.js'

export default function FinalCtaSection() {
  return (
    <CTASection
      title={finalCta.title}
      description={finalCta.description}
      primaryLabel={finalCta.primaryLabel}
      primaryTo="/contatti"
      secondaryLabel={finalCta.secondaryLabel}
      secondaryHref={site.linkedinUrl}
    />
  )
}
