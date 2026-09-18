export default function BooleanField({ value, onChange, label }) {
  return (
    <label className="flex items-center gap-2 text-fluid-sm text-ink-800">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-ink-800/30"
      />
      {label}
    </label>
  )
}
