import { useState } from 'react'
import { useParams } from 'react-router-dom'
import DocumentForm from '../components/DocumentForm.jsx'
import { useContentDoc } from '../hooks/useContentDoc.js'
import { CONTENT_BLOCKS } from '../schemas/contentBlocks.js'

export default function ContentEditor() {
  const { blockId } = useParams()
  const block = CONTENT_BLOCKS.find((b) => b.id === blockId)
  const { data, loading, error, save } = useContentDoc(blockId)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState('')

  if (!block) {
    return <p className="text-fluid-sm text-ink-600">Blocco di contenuto non trovato.</p>
  }

  if (loading) {
    return <p className="text-fluid-sm text-ink-500">Caricamento...</p>
  }

  if (error) {
    return (
      <p className="text-fluid-sm text-red-600">
        Impossibile caricare questo contenuto: {error}
      </p>
    )
  }

  async function handleSave(nextData) {
    setSaving(true)
    await save(nextData)
    setSaving(false)
    setSavedAt(new Date().toLocaleTimeString('it-IT'))
  }

  return (
    <div>
      <h1 className="text-fluid-xl font-bold text-ink-950">{block.label}</h1>
      <p className="mt-1 text-fluid-sm text-ink-500">
        Le modifiche si salvano su Firestore e sono visibili immediatamente sul sito pubblico.
      </p>

      <div className="mt-8">
        <DocumentForm key={blockId} schema={block.fields} initialData={data} onSave={handleSave} saving={saving} savedAt={savedAt} />
      </div>
    </div>
  )
}
