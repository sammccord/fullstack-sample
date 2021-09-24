import React from 'react'
import { Checkbox, CheckboxClasses } from '../src/components/Checkbox'

const sizes = Object.keys(CheckboxClasses.size)
const colors = Object.keys(CheckboxClasses.color)

export default function ButtonDocs() {
  return (
    <fieldset className='space-y-5'>
      <legend className='sr-only'>Checkboxes</legend>
      <Checkbox label='Default label' help='Help text'></Checkbox>
      {colors.map((color: any) => (
        <>
          {sizes.map((size: any) => (
            <Checkbox color={color} size={size}></Checkbox>
          ))}
        </>
      ))}
    </fieldset>
  )
}
