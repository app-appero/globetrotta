export default function ServiceCard({ title, description, examples }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow duration-200 ease-smooth hover:shadow-card-hover sm:p-8">
      <h3 className="text-fluid-xl font-bold text-ink-950">{title}</h3>
      <p className="mt-3 text-fluid-base text-ink-600">{description}</p>
      {examples?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {examples.map((example) => (
            <li
              key={example}
              className="rounded-full bg-ink-950/[0.04] px-3 py-1.5 text-fluid-xs font-medium text-ink-700"
            >
              {example}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
