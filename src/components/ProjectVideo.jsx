function getEmbedUrl(videoUrl) {
  try {
    const url = new URL(videoUrl)
    const host = url.hostname.toLowerCase()

    if (host === 'youtu.be' || host.endsWith('.youtu.be')) {
      const videoId = url.pathname.split('/').filter(Boolean)[0]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (host === 'youtube.com' || host.endsWith('.youtube.com')) {
      const videoId = url.pathname === '/watch'
        ? url.searchParams.get('v')
        : url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]
      return videoId ? `https://www.youtube.com/embed/${videoId}` : null
    }

    if (host === 'vimeo.com' || host.endsWith('.vimeo.com')) {
      const videoId = url.pathname.split('/').filter(Boolean).pop()
      return videoId && /^\d+$/.test(videoId) ? `https://player.vimeo.com/video/${videoId}` : null
    }
  } catch {
    return null
  }

  return null
}

export default function ProjectVideo({ videoUrl }) {
  const url = videoUrl?.trim()
  if (!url) return null

  const embedUrl = getEmbedUrl(url)

  return (
    <div className="overflow-hidden rounded-2xl border border-ink-800/10 bg-ink-950">
      {embedUrl ? (
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            title="Video di presentazione del progetto"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : (
        <video
          src={url}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full"
        >
          Il browser non supporta la riproduzione di questo video.
        </video>
      )}
    </div>
  )
}
