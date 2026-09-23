export default function PlaceholderVisual({ label, className = '' }) {
  return (
    <div className={`flex h-full min-h-40 items-center justify-center bg-paper-200 px-6 text-center ${className}`}>
      <span className="text-fluid-sm font-medium text-ink-500">{label}</span>
    </div>
  )
}
