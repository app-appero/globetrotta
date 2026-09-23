import TextField from './TextField.jsx'
import TextAreaField from './TextAreaField.jsx'
import StringListField from './StringListField.jsx'
import ObjectListField from './ObjectListField.jsx'
import ObjectField from './ObjectField.jsx'
import ImageField from './ImageField.jsx'
import BooleanField from './BooleanField.jsx'
import RadioField from './RadioField.jsx'
import NumberField from './NumberField.jsx'
import GalleryField from './GalleryField.jsx'

/**
 * Dispatcher generico: dato uno schema di campo { type, ... } renderizza il
 * componente giusto. objectList/object richiamano Field ricorsivamente per i
 * loro itemFields, così un'unica definizione di schema copre sia i blocchi di
 * contenuto (src/admin/schemas/contentBlocks.js) sia i progetti
 * (src/admin/schemas/project.js).
 */
export default function Field({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea':
      return <TextAreaField value={value ?? ''} onChange={onChange} readOnly={field.readOnly} />
    case 'stringList':
      return <StringListField value={value ?? []} onChange={onChange} />
    case 'objectList':
      return <ObjectListField value={value ?? []} onChange={onChange} itemFields={field.itemFields} />
    case 'object':
      return <ObjectField value={value ?? {}} onChange={onChange} itemFields={field.itemFields} />
    case 'image':
      return <ImageField value={value ?? ''} onChange={onChange} uploadPath={field.uploadPath} />
    case 'boolean':
      return <BooleanField value={Boolean(value)} onChange={onChange} label={field.checkboxLabel} />
    case 'radio':
      return <RadioField value={value} onChange={onChange} options={field.options} name={field.key} label={field.label} required={field.required} />
    case 'number':
      return <NumberField value={value} onChange={onChange} />
    case 'gallery':
      return <GalleryField value={value} onChange={onChange} uploadPath={field.uploadPath} />
    case 'text':
    default:
      return <TextField value={value ?? ''} onChange={onChange} readOnly={field.readOnly} />
  }
}
