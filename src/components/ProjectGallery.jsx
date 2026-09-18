function isEmbeddableVideoUrl(url) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url)
}

function toEmbedUrl(url) {
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('youtube.com/watch')) {
    const id = new URL(url).searchParams.get('v')
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1]
    return `https://player.vimeo.com/video/${id}`
  }
  return url
}

export default function ProjectGallery({ gallery, demoVideoUrl }) {
  const hasGallery = gallery?.length > 0
  if (!hasGallery && !demoVideoUrl) return null

  return (
    <div className="space-y-8">
      {demoVideoUrl && (
        <div className="overflow-hidden rounded-2xl border border-ink-800/10 bg-ink-950">
          {isEmbeddableVideoUrl(demoVideoUrl) ? (
            <div className="aspect-video w-full">
              <iframe
                src={toEmbedUrl(demoVideoUrl)}
                title="Video demo del progetto"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <video src={demoVideoUrl} controls className="aspect-video w-full" />
          )}
        </div>
      )}

      {hasGallery && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {gallery.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-2xl border border-ink-800/10 bg-paper-200">
              <img src={image.src} alt={image.alt} loading="lazy" className="w-full object-cover" />
              {image.caption && (
                <figcaption className="px-4 py-3 text-fluid-xs text-ink-500">{image.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </div>
  )
}
