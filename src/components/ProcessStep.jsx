export default function ProcessStep({ number, title, description }) {
  return (
    <div className="flex gap-5">
      <span className="shrink-0 text-fluid-2xl font-bold text-accent-300">{number}</span>
      <div>
        <h3 className="text-fluid-lg font-semibold text-ink-950">{title}</h3>
        <p className="mt-1.5 text-fluid-base text-ink-600">{description}</p>
      </div>
    </div>
  )
}
