export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-fluid-3xl font-bold tracking-tight text-ink-950">{title}</h2>
      {description && <p className="mt-4 text-fluid-lg text-ink-600">{description}</p>}
    </div>
  )
}
