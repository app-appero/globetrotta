export default function NumberField({ value, onChange }) {
  return (
    <input
      type="number"
      min="0"
      step="1"
      value={value ?? 0}
      onChange={(event) => onChange(event.target.value === '' ? 0 : Number(event.target.value))}
      className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950 outline-none transition-colors focus:border-accent-500"
    />
  )
}
