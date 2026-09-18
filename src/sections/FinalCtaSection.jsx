import CTASection from '../components/CTASection.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function FinalCtaSection() {
  const { data: site } = useContentBlock('site')
  const { data: finalCta } = useContentBlock('finalCta')
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
