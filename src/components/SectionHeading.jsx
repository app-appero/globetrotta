export default function SectionHeading({ eyebrow, title, description, align = 'left', as = 'h2' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const Heading = as

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Heading className="text-fluid-3xl font-bold tracking-tight text-ink-950">{title}</Heading>
      {description && <p className="mt-4 text-fluid-lg text-ink-600">{description}</p>}
    </div>
  )
}
