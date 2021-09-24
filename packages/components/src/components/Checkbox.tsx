import React from 'react'
import clsx from 'clsx'
import { Colors } from '../colors'

export interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  color?: Colors
  help?: string | React.ReactNode
  size?: any
  label?: string
}

export const CheckboxClasses = {
  _: 'border-2 bg-opacity-0 hover:bg-opacity-40 transition rounded focus:ring-transparent',
  label: 'font-semibold text-white uppercase',
  help: 'text-gray-300',
  size: {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    base: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-7 w-7'
  },
  color: {
    red: 'bg-red-600 border-red-600 text-red-600',
    orange: 'bg-orange-500 border-orange-500 text-orange-500',
    amber: 'bg-amber-500 border-amber-500 text-amber-500',
    yellow: 'bg-yellow-500 border-yellow-500 text-yellow-500',
    lime: 'bg-lime-500 border-lime-500 text-lime-500',
    green: 'bg-green-500 border-green-500 text-green-500',
    emerald: 'bg-emerald-500 border-emerald-500 text-emerald-500',
    teal: 'bg-teal-500 border-teal-500 text-teal-500',
    cyan: 'bg-cyan-500 border-cyan-500 text-cyan-500',
    sky: 'bg-sky-500 border-sky-500 text-sky-500',
    blue: 'bg-blue-500 border-blue-500 text-blue-500',
    indigo: 'bg-indigo-500 border-indigo-500 text-indigo-500',
    violet: 'bg-violet-500 border-violet-500 text-violet-500',
    purple: 'bg-purple-500 border-purple-500 text-purple-500',
    fuchsia: 'bg-fuchsia-500 border-fuchsia-500 text-fuchsia-500',
    pink: 'bg-pink-500 border-pink-500 text-pink-500',
    rose: 'bg-rose-500 border-rose-500 text-rose-500',
    white: 'bg-white border-white text-white'
  }
}

export function Checkbox({
  name,
  color = 'red',
  label,
  className,
  size = 'base',
  help,
  ...props
}: CheckboxProps) {
  return (
    <>
      {!label ? (
        <input
          {...props}
          id={name}
          aria-describedby={`${name}-description`}
          name={name}
          type='checkbox'
          className={clsx(
            className,
            CheckboxClasses._,
            (CheckboxClasses.size as any)[size],
            (CheckboxClasses.color as any)[color]
          )}
        ></input>
      ) : (
        <div className='relative flex items-center'>
          <div className='flex items-center h-5'>
            <input
              {...props}
              id={name}
              aria-describedby={`${name}-description`}
              name={name}
              type='checkbox'
              className={clsx(
                className,
                CheckboxClasses._,
                (CheckboxClasses.size as any)[size],
                (CheckboxClasses.color as any)[color]
              )}
            />
          </div>
          <div className='ml-2 text-sm'>
            <label htmlFor={name} className={CheckboxClasses.label}>
              {label}
            </label>
            {help && (
              <p
                aria-describedby={`${name}-description`}
                className={CheckboxClasses.help}
              >
                {help}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
