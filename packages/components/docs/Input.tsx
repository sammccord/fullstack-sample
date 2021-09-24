import React from 'react'
import { Input, InputClasses } from '../src/components/Input'

const sizes = Object.keys(InputClasses.size)
const colors = Object.keys(InputClasses.color)

export default function ButtonDocs() {
  return (
    <div className='space-y-4'>
      <div className='max-w-3xl mx-auto space-y-4 space-x-2  flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around'>
        <div>
          <Input
            label='Normal w/ Help'
            placeholder='Help'
            size='lg'
            help='Sup fill me up friendo'
          />
        </div>
        <div>
          <Input label='With Error' placeholder='Oops' size='lg' error />
        </div>
        <div>
          <Input
            label='With Error Message'
            placeholder='Oops'
            size='lg'
            error='Something went wrong'
          />
        </div>
      </div>
      {colors.map((color: any) => (
        <div
          key={color}
          className='max-w-3xl mx-auto space-y-4 space-x-2  flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around'
        >
          {sizes.map((size: any) => (
            <Input
              label={color}
              placeholder={color}
              color={color}
              size={size}
            ></Input>
          ))}
        </div>
      ))}
    </div>
  )
}
