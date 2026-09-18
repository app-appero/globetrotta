import Field from './Field.jsx'

function emptyItem(itemFields) {
  return Object.fromEntries(
    itemFields.map((field) => [field.key, field.type === 'stringList' || field.type === 'objectList' ? [] : '']),
  )
}

export default function ObjectListField({ value, onChange, itemFields }) {
  function updateItem(index, key, itemValue) {
    onChange(value.map((item, i) => (i === index ? { ...item, [key]: itemValue } : item)))
  }

  function removeItem(index) {
    onChange(value.filter((_, i) => i !== index))
  }

  function addItem() {
    onChange([...value, emptyItem(itemFields)])
  }

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="space-y-3 rounded-2xl border border-ink-800/10 bg-paper-100 p-4">
          {itemFields.map((itemField) => (
            <div key={itemField.key}>
              <label className="block text-fluid-xs font-semibold uppercase tracking-wide text-ink-500">
                {itemField.label}
              </label>
              <div className="mt-1">
                <Field field={itemField} value={item[itemField.key]} onChange={(v) => updateItem(index, itemField.key, v)} />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => removeItem(index)} className="text-fluid-xs font-medium text-red-600 hover:underline">
            Rimuovi elemento
          </button>
        </div>
      ))}
      <button type="button" onClick={addItem} className="btn-secondary text-fluid-xs">
        + Aggiungi elemento
      </button>
    </div>
  )
}
