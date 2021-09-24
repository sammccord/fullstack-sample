import { Checkbox, CheckboxProps } from '@sammccord/components'
import { Field } from 'react-final-form'

export default function FieldCheckbox({ name, ...props }: CheckboxProps) {
  return (
    <Field name={name}>
      {(fieldProps) => (
        <Checkbox
          name={fieldProps.input.name}
          value={fieldProps.input.value}
          onChange={fieldProps.input.onChange}
          {...props}
        />
      )}
    </Field>
  )
}
