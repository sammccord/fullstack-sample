import React, { useState } from 'react'
import Button from './Button'
import Input from './Input'
import Card from './Card'
import Checkbox from './Checkbox'
import Radio from './Radio'
import Select from './Select'
import Table from './Table'
import Modal from './Modal'

const components = [
  'Button',
  'Input',
  'Card',
  'Checkbox',
  'Radio',
  'Select',
  'Table',
  'Modal'
]

export default function Docs() {
  const [component, setComponent] = useState('Button')

  return (
    <div className='relative'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex justify-between items-center border-b border-white py-4 md:justify-start md:space-x-10'>
          <div className='flex justify-start lg:w-0 lg:flex-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-auto sm:h-10 text-white'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M13 10V3L4 14h7v7l9-11h-7z'
              />
            </svg>
          </div>
          <nav className='flex space-x-10'>
            {components.map((c) => (
              <a
                href='#'
                onClick={() => setComponent(c)}
                className='text-base font-medium text-gray-100 hover:text-gray-300'
              >
                {c}
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className='container mx-auto p-6 lg:p-8'>
        {component === 'Button' && <Button />}
        {component === 'Input' && <Input />}
        {component === 'Card' && <Card />}
        {component === 'Checkbox' && <Checkbox />}
        {component === 'Radio' && <Radio />}
        {component === 'Select' && <Select />}
        {component === 'Table' && <Table />}
        {component === 'Modal' && <Modal />}
      </div>
    </div>
  )
}
