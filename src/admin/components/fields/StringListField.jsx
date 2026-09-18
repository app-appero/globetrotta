export default function StringListField({ value, onChange }) {
  function updateItem(index, newValue) {
    const next = [...value]
    next[index] = newValue
    onChange(next)
  }

  function removeItem(index) {
    onChange(value.filter((_, i) => i !== index))
  }

  function addItem() {
    onChange([...value, ''])
  }

  return (
    <div className="space-y-2">
      {value.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="w-full rounded-xl border border-ink-800/15 bg-paper-50 px-4 py-2.5 text-fluid-sm text-ink-950 outline-none focus:border-accent-500"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="shrink-0 rounded-xl border border-ink-800/15 px-3 text-fluid-xs text-ink-600 hover:bg-ink-950/5"
          >
            Rimuovi
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="btn-secondary text-fluid-xs">
        + Aggiungi
      </button>
    </div>
  )
}
