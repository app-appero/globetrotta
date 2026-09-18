import { useContentBlock } from '../hooks/usePublicContent.jsx'

export default function TechStack() {
  const { data: techStack } = useContentBlock('techStack')
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {techStack.groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-fluid-sm font-semibold uppercase tracking-[0.08em] text-ink-500">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-ink-800/10 px-3 py-1.5 text-fluid-sm text-ink-800">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-prose text-fluid-sm text-ink-500">{techStack.note}</p>
    </div>
  )
}
