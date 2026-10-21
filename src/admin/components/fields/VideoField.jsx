import { useRef, useState } from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { getFirebaseStorage } from '../../firebaseClient.js'

export default function VideoField({ id, value, onChange, uploadPath = 'uploads/videos' }) {
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  function handleFileChange(event) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      setError('Seleziona un file video valido.')
      event.target.value = ''
      return
    }

    setUploading(true)
    setProgress(0)
    setError('')
    try {
      const path = `${uploadPath}/${Date.now()}-${file.name.replace(/[\\/]/g, '-')}`
      const uploadTask = uploadBytesResumable(ref(getFirebaseStorage(), path), file, {
        contentType: file.type,
      })

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
        },
        (uploadError) => {
          setError(`Upload non riuscito: ${uploadError.message}`)
          setUploading(false)
          if (inputRef.current) inputRef.current.value = ''
        },
        async () => {
          try {
            onChange(await getDownloadURL(uploadTask.snapshot.ref))
          } catch (downloadError) {
            setError(`Impossibile ottenere il link del video: ${downloadError.message}`)
          } finally {
            setUploading(false)
            if (inputRef.current) inputRef.current.value = ''
          }
        },
      )
    } catch (uploadError) {
      setError(`Upload non riuscito: ${uploadError.message}`)
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-3">
      <input
        id={id}
        type="url"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
        placeholder="URL YouTube, Vimeo o file video"
        className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950 outline-none focus:border-accent-500"
      />
      {value && (
        <div className="space-y-3">
          {value.startsWith('https://firebasestorage.googleapis.com/') && (
            <video
              src={value}
              controls
              preload="metadata"
              className="aspect-video w-full max-w-xl rounded-xl bg-ink-950"
            />
          )}
          <button
            type="button"
            onClick={() => {
              onChange('')
              setError('')
            }}
            disabled={uploading}
            className="text-fluid-xs font-medium text-red-600 hover:underline disabled:opacity-60"
          >
            Elimina video dal progetto
          </button>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <label className="btn-secondary cursor-pointer whitespace-nowrap text-fluid-xs">
          {uploading ? `Caricamento ${progress}%...` : 'Carica un video'}
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
        {uploading && (
          <progress aria-label="Avanzamento caricamento video" className="h-2 w-40 accent-accent-500" value={progress} max="100">
            {progress}%
          </progress>
        )}
      </div>
      {error && <p className="text-fluid-xs text-red-600">{error}</p>}
    </div>
  )
}
