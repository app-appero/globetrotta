export default function TextAreaField({ value, onChange, placeholder, readOnly }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      rows={4}
      className={`w-full rounded-xl border border-ink-800/15 px-4 py-2.5 text-fluid-sm text-ink-950 outline-none transition-colors focus:border-accent-500 ${
        readOnly ? 'bg-paper-200 text-ink-500' : 'bg-paper-50'
      }`}
    />
  )
}
