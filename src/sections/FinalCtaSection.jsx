import CTASection from '../components/CTASection.jsx'
import { useContentBlock } from '../hooks/usePublicContent.jsx'
import { normalizeExternalUrl } from '../utils/externalUrl.js'

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
      secondaryHref={normalizeExternalUrl(site.linkedinUrl)}
    />
  )
}
