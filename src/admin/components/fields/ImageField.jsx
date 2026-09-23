import { useRef, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirebaseStorage } from '../../firebaseClient.js'

export default function ImageField({ id, value, onChange, uploadPath = 'uploads' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFileChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const path = `${uploadPath}/${Date.now()}-${file.name}`
      const storageRef = ref(getFirebaseStorage(), path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      onChange(url)
    } catch (err) {
      setError('Upload non riuscito: ' + err.message)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      {value && <img src={value} alt="" className="mb-3 h-32 w-32 rounded-xl border border-ink-800/10 object-cover" />}
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="text"
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL immagine, oppure carica un file"
          className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950 outline-none focus:border-accent-500"
        />
        <label className="btn-secondary shrink-0 cursor-pointer whitespace-nowrap text-fluid-xs">
          {uploading ? 'Caricamento...' : 'Carica'}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>
      {error && <p className="mt-2 text-fluid-xs text-red-600">{error}</p>}
    </div>
  )
}
