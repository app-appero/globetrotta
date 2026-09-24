const STAR_PATH = 'M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 14.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L10 1.5z'

function RatingStars({ rating }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Valutazione: ${rating} su 5`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`h-4 w-4 fill-current ${index < rating ? 'text-accent-500' : 'text-ink-500'}`}
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialCard({ testimonial, className = '' }) {
  const showIdentity = testimonial.showIdentity !== false
  const rating = Number(testimonial.rating)
  const hasRating = Number.isFinite(rating) && rating >= 1 && rating <= 5
  const quote = testimonial.shortQuote || testimonial.testimonialText
  const metaLine = showIdentity
    ? [testimonial.clientRole, testimonial.companyName].filter(Boolean).join(' · ')
    : ''

  return (
    <figure className={`card flex h-full flex-col p-6 sm:p-7 ${className}`}>
      {hasRating && <RatingStars rating={rating} />}

      <blockquote className={hasRating ? 'mt-4' : ''}>
        <p className="text-fluid-base text-ink-700">“{quote}”</p>
      </blockquote>

      {testimonial.concreteResult && (
        <p className="mt-4 rounded-xl bg-accent-50 px-4 py-3 text-fluid-sm text-accent-900">
          <span className="font-semibold">Risultato ottenuto:</span> {testimonial.concreteResult}
        </p>
      )}

      <figcaption className="mt-6 flex items-center gap-3">
        {showIdentity && testimonial.clientImage && (
          <img
            src={testimonial.clientImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        )}
        <div className="min-w-0">
          <p className="truncate text-fluid-sm font-semibold text-ink-950">
            {showIdentity && testimonial.clientName ? testimonial.clientName : 'Cliente GlobeTrotta'}
          </p>
          {metaLine && <p className="truncate text-fluid-xs text-ink-500">{metaLine}</p>}
          {testimonial.projectName && <p className="truncate text-fluid-xs text-ink-500">{testimonial.projectName}</p>}
        </div>
      </figcaption>
    </figure>
  )
}
