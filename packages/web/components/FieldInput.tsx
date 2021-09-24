import { Input } from '@sammccord/components'
import { Field } from 'react-final-form'

export default function FieldInput({ name, ...props }) {
  return (
    <Field name={name}>
      {(fieldProps) => (
        <Input
          name={fieldProps.input.name}
          value={fieldProps.input.value}
          onChange={fieldProps.input.onChange}
          {...props}
        />
      )}
    </Field>
  )
}
