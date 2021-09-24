import React from 'react'
import { Button, ButtonClasses } from '../src/components/Button'
import { BeakerIcon } from '@heroicons/react/solid'

const sizes = Object.keys(ButtonClasses.size)
const variants = Object.keys(ButtonClasses.variant)
const colors = Object.keys(ButtonClasses.variant.primary.color)

export default function ButtonDocs() {
  return (
    <div className='space-y-4'>
      {variants.map((variant: any) => (
        <div key={variant} className='space-y-4'>
          {colors.map((color: any) => (
            <div
              key={variant + color}
              className='max-w-3xl mx-auto space-y-4 flex flex-col items-center justify-start sm:space-y-0 sm:flex-row sm:items-end sm:justify-around'
            >
              {sizes.map((size: any) => (
                <>
                  <Button variant={variant} color={color} size={size}>
                    {color}
                  </Button>
                  <Button variant={variant} color={color} size={size} icon>
                    <BeakerIcon className='h-5 w-5' />
                  </Button>
                  <Button disabled variant={variant} color={color} size={size}>
                    {color}
                  </Button>
                </>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
