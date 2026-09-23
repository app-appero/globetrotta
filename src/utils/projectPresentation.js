export function getProjectOriginLabel(origin) {
  return {
    personal: 'Personale',
    client: 'Cliente',
    collaboration: 'Collaborazione',
    other: 'Altro',
  }[origin] || 'Origine da definire'
}

export function getProjectStatusLabel(status) {
  return {
    draft: 'Bozza',
    'in-development': 'In costruzione',
    beta: 'Beta',
    online: 'Online',
  }[status] || 'Stato da definire'
}

export function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : Number.MAX_SAFE_INTEGER
    const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : Number.MAX_SAFE_INTEGER
    return orderA - orderB || String(a.title || '').localeCompare(String(b.title || ''), 'it')
  })
}
