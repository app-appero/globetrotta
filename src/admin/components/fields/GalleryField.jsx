import { useRef, useState } from 'react'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getFirebaseStorage } from '../../firebaseClient.js'

function createItem(src = '') {
  return { src, title: '', alt: '', caption: '', isCover: false }
}

export default function GalleryField({ value = [], onChange, uploadPath = 'projects' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function updateItem(index, changes) {
    const next = value.map((item, itemIndex) => itemIndex === index ? { ...item, ...changes } : item)
    if (changes.isCover) {
      next.forEach((item, itemIndex) => {
        if (itemIndex !== index) item.isCover = false
      })
    }
    onChange(next)
  }

  function removeItem(index) {
    onChange(value.filter((_, itemIndex) => itemIndex !== index))
  }

  async function handleFiles(event) {
    const files = Array.from(event.target.files || [])
    if (!files.length) return
    setUploading(true)
    setError('')
    try {
      const uploaded = await Promise.all(files.map(async (file) => {
        const storageRef = ref(getFirebaseStorage(), `${uploadPath}/${Date.now()}-${file.name}`)
        await uploadBytes(storageRef, file)
        return createItem(await getDownloadURL(storageRef))
      }))
      onChange([...value, ...uploaded])
    } catch (err) {
      setError('Upload non riuscito: ' + err.message)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="btn-secondary cursor-pointer text-fluid-xs">
          {uploading ? 'Caricamento...' : 'Carica più immagini'}
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" disabled={uploading} />
        </label>
        <span className="text-fluid-xs text-ink-500">Puoi selezionare più file insieme.</span>
      </div>
      {value.map((item, index) => (
        <div key={`${item.src}-${index}`} className="space-y-3 rounded-2xl border border-ink-800/10 bg-paper-100 p-4">
          {item.src && (
            <div className="flex min-h-32 max-h-96 items-center justify-center overflow-auto rounded-xl border border-ink-800/10 bg-paper-200 p-2">
              <img
                src={item.src}
                alt=""
                className="max-h-80 max-w-full object-contain"
              />
            </div>
          )}
          <input
            type="text"
            value={item.src || ''}
            onChange={(event) => updateItem(index, { src: event.target.value })}
            placeholder="URL immagine"
            className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950"
          />
          <input type="text" value={item.title || ''} onChange={(event) => updateItem(index, { title: event.target.value })} placeholder="Titolo immagine" className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950" />
          <input type="text" value={item.alt || ''} onChange={(event) => updateItem(index, { alt: event.target.value })} placeholder="Testo alternativo" className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950" />
          <input type="text" value={item.caption || ''} onChange={(event) => updateItem(index, { caption: event.target.value })} placeholder="Didascalia (opzionale)" className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950" />
          <label className="flex items-center gap-2 text-fluid-sm text-ink-700">
            <input type="checkbox" checked={Boolean(item.isCover)} onChange={(event) => updateItem(index, { isCover: event.target.checked })} />
            Usa come copertina
          </label>
          <button type="button" onClick={() => removeItem(index)} className="text-fluid-xs font-medium text-red-600 hover:underline">
            Rimuovi immagine
          </button>
        </div>
      ))}
    </div>
  )
}
