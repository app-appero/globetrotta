import { useState } from 'react'
import Field from './fields/Field.jsx'

export default function DocumentForm({ schema, initialData, onSave, saving, savedAt }) {
  const [data, setData] = useState(initialData)

  function setFieldValue(key, value) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault()
        onSave(data)
      }}
    >
      {schema.map((field) => (
        <div key={field.key}>
          <label className="block text-fluid-sm font-semibold text-ink-900">{field.label}</label>
          {field.helpText && <p className="mt-1 text-fluid-xs text-ink-500">{field.helpText}</p>}
          <div className="mt-2">
            <Field field={field} value={data[field.key]} onChange={(value) => setFieldValue(field.key, value)} />
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4 border-t border-ink-800/10 pt-6">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Salvataggio...' : 'Salva'}
        </button>
        {savedAt && <span className="text-fluid-xs text-ink-500">Salvato alle {savedAt}</span>}
      </div>
    </form>
  )
}
