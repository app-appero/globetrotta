export default function ServiceCard({ title, description, examples }) {
  return (
    <div className="card flex h-full flex-col p-6 sm:p-8">
      <h3 className="text-fluid-xl font-bold text-ink-950">{title}</h3>
      <p className="mt-3 text-fluid-base text-ink-600">{description}</p>
      {examples?.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {examples.map((example) => (
            <li key={example} className="tag">
              {example}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
