import React from 'react'
import { RadioGroup } from '@headlessui/react'

export interface RadioProps<T> {
  onChange: (option: T) => void
  value: T
  name: string
  options: T[]
  className?: string
  children: (renderProps: {
    active: boolean
    checked: boolean
    disabled: boolean
    option: T
  }) => React.ReactNode
}

export function Radio<T>({
  options,
  name,
  onChange,
  value,
  children,
  className
}: RadioProps<T>) {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label className='sr-only'>{name}</RadioGroup.Label>
      <div className={className}>
        {options.map((option, i) => (
          <RadioGroup.Option key={`${name}-${i}`} value={option}>
            {(props) => children({ ...props, option })}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
