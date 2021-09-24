import { Select, SelectProps } from '@sammccord/components'
import { Field } from 'react-final-form'

export default function FieldSelect<T>({ name, ...props }: SelectProps<T>) {
  return (
    <Field name={name}>
      {(fieldProps) => (
        <Select
          name={fieldProps.input.name}
          value={fieldProps.input.value}
          onChange={fieldProps.input.onChange}
          {...props}
        />
      )}
    </Field>
  )
}
