import { useEffect, useState } from 'react'
import PlaceholderVisual from './PlaceholderVisual.jsx'

function isPlaceholderImage(src) {
  return !src || (src.startsWith('/projects/') && src.endsWith('.svg'))
}

export default function ProjectGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const availableImages = (gallery || []).filter((image) => !isPlaceholderImage(image.src))
  const hasGallery = availableImages.length > 0
  useEffect(() => {
    if (!selectedImage) return undefined
    function handleKeyDown(event) {
      if (event.key === 'Escape') setSelectedImage(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  if (!hasGallery) return null

  return (
    <div className="space-y-8">
      {hasGallery && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {availableImages.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-2xl border border-ink-800/10 bg-paper-200">
              {isPlaceholderImage(image.src) ? (
                <PlaceholderVisual label="Immagine non disponibile" />
              ) : (
                <button
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  aria-label={`Apri immagine: ${image.alt}`}
                >
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="w-full object-cover" />
                </button>
              )}
              {image.caption && (
                <figcaption className="px-4 py-3 text-fluid-xs text-ink-500">{image.caption}</figcaption>
              )}
              {image.title && !image.caption && (
                <figcaption className="px-4 py-3 text-fluid-sm font-medium text-ink-800">{image.title}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Immagine ingrandita: ${selectedImage.alt}`}
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="btn-invert absolute right-4 top-4 rounded-full px-3 py-2 text-fluid-sm font-semibold"
            aria-label="Chiudi immagine ingrandita"
          >
            Chiudi
          </button>
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-h-[90vh] max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
