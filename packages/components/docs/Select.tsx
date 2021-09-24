import React, { useState } from 'react'
import { Card } from '../src/components/Card'
import { Select } from '../src/components/Select'

const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk'
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk'
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk'
  }
]

export default function SelectDocs() {
  const [selected, setSelected] = useState([])
  return (
    <div className='space-y-4'>
      <Select
        className='space-y-4'
        options={plans}
        name='plans'
        onChange={setSelected}
        value={selected}
      >
        {({ checked, option }) => (
          <Card
            color='red'
            variant={checked ? 'solid' : 'empty'}
            button
            className='px-2 py-3'
          >
            <>
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center'>
                  <div className='text-sm'>
                    <p
                      className={`font-medium  ${
                        checked ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {option.name}
                    </p>
                    <span
                      className={`inline ${
                        checked ? 'text-sky-100' : 'text-gray-500'
                      }`}
                    >
                      <span>
                        {option.ram}/{option.cpus}
                      </span>{' '}
                      <span aria-hidden='true'>&middot;</span>{' '}
                      <span>{option.disk}</span>
                    </span>
                  </div>
                </div>
                {checked && (
                  <div className='flex-shrink-0 text-white'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                )}
              </div>
            </>
          </Card>
        )}
      </Select>
    </div>
  )
}
