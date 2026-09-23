import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DocumentForm from '../components/DocumentForm.jsx'
import { PROJECT_SCHEMA, EMPTY_PROJECT } from '../schemas/project.js'
import { getProject, saveProject } from '../hooks/useProjectsAdmin.js'

function prepareProjectData(data) {
  const gallery = (data.gallery || []).map((image) => ({ ...image, isCover: Boolean(image.isCover) }))
  const cover = gallery.find((image) => image.isCover && image.src) || gallery.find((image) => image.src)
  return { ...data, gallery, coverImage: cover?.src || '' }
}

export default function ProjectForm({ mode }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(mode === 'create' ? EMPTY_PROJECT : null)
  const [loading, setLoading] = useState(mode === 'edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (mode !== 'edit') return
    let cancelled = false
    getProject(id).then((project) => {
      if (!cancelled) {
        setData(project)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [mode, id])

  const schema = PROJECT_SCHEMA.map((field) =>
    field.key === 'slug' && mode === 'edit' ? { ...field, readOnly: true } : field,
  )

  async function persistProject(nextData, status) {
    if (!nextData.slug) {
      setError('Lo slug è obbligatorio.')
      return
    }
    setSaving(true)
    setError('')
    try {
      await saveProject(nextData.slug, { ...prepareProjectData(nextData), id: nextData.slug, status })
      navigate('/admin/progetti')
    } catch (err) {
      setError('Salvataggio non riuscito: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  function handleSave(nextData) {
    return persistProject(nextData, nextData.status || 'in-development')
  }

  function handleSaveDraft(nextData) {
    return persistProject(nextData, 'draft')
  }

  if (loading || !data) {
    return <p className="text-fluid-sm text-ink-500">Caricamento...</p>
  }

  return (
    <div>
      <h1 className="text-fluid-xl font-bold text-ink-950">
        {mode === 'create' ? 'Nuovo progetto' : `Modifica: ${data.title || data.slug}`}
      </h1>
      {error && <p className="mt-2 text-fluid-sm text-red-600">{error}</p>}
      <div className="mt-8">
        <DocumentForm
          schema={schema}
          initialData={data}
          onSave={handleSave}
          onSaveDraft={handleSaveDraft}
          saving={saving}
        />
      </div>
    </div>
  )
}
