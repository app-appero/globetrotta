import { Link } from 'react-router-dom'
import { useProjectsList, deleteProject, publishProject, updateProjectStatus, updateProjectOrder } from '../hooks/useProjectsAdmin.js'
import { sortProjects } from '../../utils/projectPresentation.js'

export default function ProjectsList() {
  const { projects, loading, reload } = useProjectsList()

  async function handleDelete(id, title) {
    if (!window.confirm(`Eliminare il progetto "${title}"? L'operazione non è reversibile.`)) return
    await deleteProject(id)
    reload()
  }

  async function handlePublish(slug, title) {
    if (!window.confirm(`Pubblicare "${title}"? Diventerà visibile nella pagina pubblica dei progetti.`)) return
    await publishProject(slug)
    reload()
  }

  async function handleStatusChange(slug, status) {
    await updateProjectStatus(slug, status)
    reload()
  }

  async function handleOrderChange(slug, value) {
    await updateProjectOrder(slug, Math.max(0, Number(value) || 0))
    reload()
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-fluid-xl font-bold text-ink-950">Progetti</h1>
        <Link to="/admin/progetti/nuovo" className="btn-primary shrink-0">
          + Nuovo progetto
        </Link>
      </div>

      {loading ? (
        <p className="mt-6 text-fluid-sm text-ink-500">Caricamento...</p>
      ) : projects.length === 0 ? (
        <p className="mt-6 text-fluid-sm text-ink-500">Nessun progetto ancora. Creane uno.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {sortProjects(projects).map((project) => (
            <div
              key={project.slug}
              className="flex flex-col gap-3 rounded-2xl border border-ink-800/10 bg-paper-50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-fluid-sm font-semibold text-ink-950">
                  {project.title}
                  {project.featured && (
                    <span className="ml-2 rounded-full bg-accent-100 px-2 py-0.5 text-fluid-xs text-accent-700">
                      In evidenza
                    </span>
                  )}
                </p>
                <p className="text-fluid-xs text-ink-500">/progetti/{project.slug}</p>
                <div className="mt-3 flex flex-wrap items-end gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-fluid-xs font-medium text-ink-500" htmlFor={`status-${project.slug}`}>
                      Stato di pubblicazione
                    </label>
                    <select
                      id={`status-${project.slug}`}
                      value={project.status || 'draft'}
                      onChange={(event) => handleStatusChange(project.slug, event.target.value)}
                      className="rounded-lg border border-ink-800/10 bg-paper-50 px-2 py-1 text-fluid-xs text-ink-600"
                    >
                      <option value="draft">Bozza — non visibile</option>
                      <option value="in-development">In costruzione — visibile</option>
                      <option value="beta">Beta — visibile</option>
                      <option value="online">Online — visibile</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-fluid-xs font-medium text-ink-500" htmlFor={`order-${project.slug}`}>
                      Ordine nella pagina pubblica
                    </label>
                    <input
                      id={`order-${project.slug}`}
                      type="number"
                      min="0"
                      step="1"
                      defaultValue={project.order ?? 0}
                      onBlur={(event) => handleOrderChange(project.slug, event.target.value)}
                      className="w-24 rounded-lg border border-ink-800/10 bg-paper-50 px-2 py-1 text-fluid-xs text-ink-600"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {project.status === 'draft' && (
                  <button
                    type="button"
                    onClick={() => handlePublish(project.slug, project.title)}
                    className="text-fluid-xs font-medium text-accent-700 hover:underline"
                  >
                    Pubblica
                  </button>
                )}
                <Link to={`/admin/progetti/${project.slug}`} className="text-fluid-xs font-medium text-ink-700 hover:text-ink-950">
                  Modifica
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(project.slug, project.title)}
                  className="text-fluid-xs font-medium text-red-600 hover:underline"
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
