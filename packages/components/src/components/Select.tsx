import React, { useState, useCallback, cloneElement, useEffect } from 'react'

export interface SelectProps<T> {
  onChange: (option: T[]) => void
  value: T[]
  name: string
  options: T[]
  className?: string
  children: (renderProps: { checked: boolean; option: T }) => any
}

export function Select<T>({
  options,
  name,
  onChange,
  value,
  children,
  className
}: SelectProps<T>) {
  const [selected, setSelected] = useState(value)
  const handleSetSelected = useCallback(
    (option: T) => () => {
      const i = selected.indexOf(option)
      let update
      if (i > -1) {
        selected.splice(i, 1)
        update = [...selected]
      } else {
        update = [...selected, option]
      }
      setSelected(update)
      onChange(update)
    },
    [selected, setSelected, onChange]
  )
  return (
    <div className={className}>
      <div className='sr-only'>{name}</div>
      {options.map((option, i) =>
        cloneElement(
          children({
            option,
            checked: selected.indexOf(option) > -1
          }),
          {
            key: `${name}-${i}`,
            onClick: handleSetSelected(option)
          }
        )
      )}
    </div>
  )
}
