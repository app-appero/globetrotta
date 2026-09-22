export default function ProjectFilters({ categories, activeCategory, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filtra progetti per categoria">
      {categories.map((category) => {
        const isActive = category === activeCategory
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={`min-h-[44px] rounded-full px-4 py-2 text-fluid-sm font-medium transition-colors duration-200 ease-smooth focus-visible:outline-offset-4 ${
              isActive
                ? 'bg-ink-950 text-paper-50'
                : 'border border-ink-800/15 text-ink-700 hover:border-ink-800/40'
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
