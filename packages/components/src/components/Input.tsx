import React from 'react'
import clsx from 'clsx'
import { Colors } from '../colors'

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  as?: 'input' | 'textarea' | 'select'
  color?: Colors
  error?: boolean | string | React.ReactNode
  help?: string | React.ReactNode
  size?: any
  label?: string
  bgColor?: string
}

export const InputClasses = {
  _: 'relative border rounded-lg shadow-sm focus-within:ring-1',
  label:
    'absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-semibold uppercase text-white',
  input:
    'block w-full border-0 p-0 text-white placeholder-gray-600 focus:ring-0',
  error: 'ml-1 mt-2 text-sm text-red-700',
  help: 'ml-1 mt-2 text-sm text-gray-400',
  size: {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm leading-4',
    base: 'px-3 py-2 text-sm',
    lg: 'px-3 py-2 text-base',
    xl: 'px-3 py-3 text-lg'
  },
  color: {
    error:
      'border-red-700 focus-within:ring-red-700 focus-within:border-red-700',
    red: 'border-gray-400 focus-within:ring-red-600 focus-within:border-red-600',
    orange:
      'border-gray-400 focus-within:ring-orange-500 focus-within:border-orange-500',
    amber:
      'border-gray-400 focus-within:ring-amber-500 focus-within:border-amber-500',
    yellow:
      'border-gray-400 focus-within:ring-yellow-500 focus-within:border-yellow-500',
    lime: 'border-gray-400 focus-within:ring-lime-500 focus-within:border-lime-500',
    green:
      'border-gray-400 focus-within:ring-green-500 focus-within:border-green-500',
    emerald:
      'border-gray-400 focus-within:ring-emerald-500 focus-within:border-emerald-500',
    teal: 'border-gray-400 focus-within:ring-teal-500 focus-within:border-teal-500',
    cyan: 'border-gray-400 focus-within:ring-cyan-500 focus-within:border-cyan-500',
    sky: 'border-gray-400 focus-within:ring-sky-500 focus-within:border-sky-500',
    blue: 'border-gray-400 focus-within:ring-blue-500 focus-within:border-blue-500',
    indigo:
      'border-gray-400 focus-within:ring-indigo-600 focus-within:border-indigo-600',
    violet:
      'border-gray-400 focus-within:ring-violet-500 focus-within:border-violet-500',
    purple:
      'border-gray-400 focus-within:ring-purple-500 focus-within:border-purple-500',
    fuchsia:
      'border-gray-400 focus-within:ring-fuchsia-500 focus-within:border-fuchsia-500',
    pink: 'border-gray-400 focus-within:ring-pink-500 focus-within:border-pink-500',
    rose: 'border-gray-400 focus-within:ring-rose-500 focus-within:border-rose-500',
    white: 'border-gray-400 focus-within:ring-white focus-within:border-white'
  }
}

export function Input({
  as = 'input',
  name,
  color = 'red',
  label,
  error,
  className,
  bgColor = 'bg-black',
  size = 'base',
  help,
  children,
  ...props
}: InputProps) {
  return (
    <>
      <div
        className={clsx(
          className,
          error && InputClasses.color['error'],
          (InputClasses.size as any)[size],
          InputClasses._,
          !error && (InputClasses.color as any)[color]
        )}
      >
        {label && (
          <label htmlFor={name} className={clsx(bgColor, InputClasses.label)}>
            {label}
          </label>
        )}
        {React.createElement(
          as,
          {
            name,
            className: clsx(bgColor, InputClasses.input),
            ...props
          },
          children
        )}
        {!!error && (
          <>
            <span className='flex absolute h-4 w-4 top-0 right-0 -mt-2 -mr-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-4 w-4 bg-red-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fill-rule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                    clip-rule='evenodd'
                  />
                </svg>
              </span>
            </span>
          </>
        )}
      </div>
      {!!error && (
        <p className={InputClasses.error} id={`${name}-error`}>
          {error}
        </p>
      )}
      {!!help && (
        <p className={InputClasses.help} id={`${name}-help}`}>
          {help}
        </p>
      )}
    </>
  )
}
