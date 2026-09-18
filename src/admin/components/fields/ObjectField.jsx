import Field from './Field.jsx'

export default function ObjectField({ value, onChange, itemFields }) {
  function updateKey(key, keyValue) {
    onChange({ ...value, [key]: keyValue })
  }

  return (
    <div className="space-y-3 rounded-2xl border border-ink-800/10 bg-paper-100 p-4">
      {itemFields.map((itemField) => (
        <div key={itemField.key}>
          <label className="block text-fluid-xs font-semibold uppercase tracking-wide text-ink-500">{itemField.label}</label>
          <div className="mt-1">
            <Field field={itemField} value={value[itemField.key]} onChange={(v) => updateKey(itemField.key, v)} />
          </div>
        </div>
      ))}
    </div>
  )
}
