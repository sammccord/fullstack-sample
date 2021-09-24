import React from 'react'
import { Card, CardClasses } from '../src/components/Card'

const colors = Object.keys(CardClasses.variant.outlined.color)

export default function ButtonDocs() {
  return (
    <div className='space-y-4'>
      <Card variant='empty'>Empty</Card>
      <div className='space-y-4'>
        <div className='space-y-4'>
          {[0, 1, 2, 3, 4].map((level: any) => (
            <Card
              level={level}
              className='text-white'
            >{`Elevation ${level}`}</Card>
          ))}
        </div>

        {['outlined', 'solid', 'gradient'].map((variant: any) => (
          <div className='space-y-4' key={variant}>
            {colors.map((color: any) => (
              <Card
                className='text-white'
                color={color}
                variant={variant}
                button
              >
                {color} {variant}
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
