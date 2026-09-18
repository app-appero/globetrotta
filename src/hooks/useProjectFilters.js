import { useMemo, useState } from 'react'

const ALL = 'Tutti'

export function useProjectFilters(projects, categories) {
  const [activeCategory, setActiveCategory] = useState(ALL)

  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL) return projects
    return projects.filter((project) => project.category.includes(activeCategory))
  }, [projects, activeCategory])

  return {
    categories,
    activeCategory,
    setActiveCategory,
    filteredProjects,
  }
}
