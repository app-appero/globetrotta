export default function RadioField({ value, onChange, options, name, label, required }) {
  return (
    <fieldset className="space-y-2">
      <legend className="mb-2 text-fluid-sm font-semibold text-ink-900">{label}</legend>
      {options.map((option) => (
        <label key={option.value} className="flex items-center gap-3 text-fluid-sm text-ink-800">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(event) => onChange(event.target.value)}
            required={required}
            className="h-4 w-4 border-ink-800/30 text-accent-600 focus:ring-accent-500"
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  )
}
