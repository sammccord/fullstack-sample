import React from 'react'
import clsx from 'clsx'
import { Sizes } from '../sizes'
import { Colors } from '../colors'

type ButtonVariants = 'primary' | 'secondary' | 'basic'

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  as?: 'a' | 'button'
  size?: Sizes
  color?: Colors
  variant?: ButtonVariants
  icon?: boolean
  disabled?: boolean
}

export const ButtonClasses = {
  _: 'cursor-pointer inline-flex items-center font-bold uppercase shadow-sm transform transition hover:-translate-y-0.5 active:translate-y-0.5 active:scale-98 focus:outline-none',
  size: {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm leading-4',
    base: 'px-4 py-2 text-sm',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-lg'
  },
  icon: {
    size: {
      xs: 'p-1 text-xs',
      sm: 'p-1.5 text-sm leading-4',
      base: 'p-2 text-sm',
      lg: 'p-3 text-base',
      xl: 'p-4 text-lg'
    }
  },
  disabled: {
    _: 'pointer-events-none cursor-not-allowed opacity-40'
  },
  variant: {
    primary: {
      _: 'rounded-lg shadow-sm',
      color: {
        red: 'text-white bg-red-600 hover:bg-red-500 focus:bg-red-700 active:bg-red-800',
        orange:
          'text-black bg-orange-500 hover:bg-orange-400 focus:bg-orange-600 active:bg-orange-700',
        amber:
          'text-black bg-amber-500 hover:bg-amber-400 focus:bg-amber-600 active:bg-amber-700',
        yellow:
          'text-black bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-600 active:bg-yellow-700',
        lime: 'text-black bg-lime-500 hover:bg-lime-400 focus:bg-lime-600 active:bg-lime-700',
        green:
          'text-black bg-green-500 hover:bg-green-400 focus:bg-green-600 active:bg-green-700',
        emerald:
          'text-black bg-emerald-500 hover:bg-emerald-400 focus:bg-emerald-600 active:bg-emerald-700',
        teal: 'text-black bg-teal-500 hover:bg-teal-400 focus:bg-teal-600 active:bg-teal-700',
        cyan: 'text-black bg-cyan-500 hover:bg-cyan-400 focus:bg-cyan-600 active:bg-cyan-700',
        sky: 'text-black bg-sky-500 hover:bg-sky-400 focus:bg-sky-600 active:bg-sky-700',
        blue: 'text-black bg-blue-500 hover:bg-blue-400 focus:bg-blue-600 active:bg-blue-700',
        indigo:
          'text-black bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-600 active:bg-indigo-700',
        violet:
          'text-black bg-violet-500 hover:bg-violet-400 focus:bg-violet-600 active:bg-violet-700',
        purple:
          'text-black bg-purple-500 hover:bg-purple-400 focus:bg-purple-600 active:bg-purple-700',
        fuchsia:
          'text-black bg-fuchsia-500 hover:bg-fuchsia-400 focus:bg-fuchsia-600 active:bg-fuchsia-700',
        pink: 'text-black bg-pink-500 hover:bg-pink-400 focus:bg-pink-600 active:bg-pink-700',
        rose: 'text-black bg-rose-500 hover:bg-rose-400 focus:bg-rose-600 active:bg-rose-700',
        white:
          'text-black bg-gray-100 hover:bg-white focus:bg-gray-200 active:bg-gray-300',
        gray: 'text-black bg-gray-400 hover:bg-gray-300 focus:bg-gray-500 active:bg-gray-600'
      }
    },
    secondary: {
      _: 'border-2 bg-opacity-0 rounded-lg hover:bg-opacity-20',
      color: {
        red: 'text-red-600 border-red-600 bg-red-600 active:bg-red-900',
        orange:
          'text-orange-500 border-orange-500 bg-orange-500 active:bg-orange-800',
        amber:
          'text-amber-500 border-amber-500 bg-amber-500 active:bg-amber-800',
        yellow:
          'text-yellow-500 border-yellow-500 bg-yellow-500 active:bg-yellow-800',
        lime: 'text-lime-500 border-lime-500 bg-lime-500 active:bg-lime-800',
        green:
          'text-green-500 border-green-500 bg-green-500 active:bg-green-800',
        emerald:
          'text-emerald-500 border-emerald-500 bg-emerald-500 active:bg-emerald-800',
        teal: 'text-teal-500 border-teal-500 bg-teal-500 active:bg-teal-800',
        cyan: 'text-cyan-500 border-cyan-500 bg-cyan-500 active:bg-cyan-800',
        sky: 'text-sky-500 border-sky-500 bg-sky-500 active:bg-sky-800',
        blue: 'text-blue-500 border-blue-500 bg-blue-500 active:bg-blue-800',
        indigo:
          'text-indigo-500 border-indigo-500 bg-indigo-500 active:bg-indigo-800',
        violet:
          'text-violet-500 border-violet-500 bg-violet-500 active:bg-violet-800',
        purple:
          'text-purple-500 border-purple-500 bg-purple-500 active:bg-purple-800',
        fuchsia:
          'text-fuchsia-500 border-fuchsia-500 bg-fuchsia-500 active:bg-fuchsia-800',
        pink: 'text-pink-500 border-pink-500 bg-pink-500 active:bg-pink-800',
        rose: 'text-rose-500 border-rose-500 bg-rose-500 active:bg-rose-800',
        white: 'text-white border-white bg-white active:bg-gray-300',
        gray: 'text-gray-300 border-gray-300 bg-gray-300 active:bg-gray-800'
      }
    },
    basic: {
      _: 'bg-opacity-0 rounded-lg hover:bg-opacity-20',
      color: {
        red: 'text-red-600 bg-red-600 active:bg-red-900',
        orange: 'text-orange-500 bg-orange-500 active:bg-orange-800',
        amber: 'text-amber-500 bg-amber-500 active:bg-amber-800',
        yellow: 'text-yellow-500 bg-yellow-500 active:bg-yellow-800',
        lime: 'text-lime-500 bg-lime-500 active:bg-lime-800',
        green: 'text-green-500 bg-green-500 active:bg-green-800',
        emerald: 'text-emerald-500 bg-emerald-500 active:bg-emerald-800',
        teal: 'text-teal-500 bg-teal-500 active:bg-teal-800',
        cyan: 'text-cyan-500 bg-cyan-500 active:bg-cyan-800',
        sky: 'text-sky-500 bg-sky-500 active:bg-sky-800',
        blue: 'text-blue-500 bg-blue-500 active:bg-blue-800',
        indigo: 'text-indigo-500 bg-indigo-500 active:bg-indigo-800',
        violet: 'text-violet-500 bg-violet-500 active:bg-violet-800',
        purple: 'text-purple-500 bg-purple-500 active:bg-purple-800',
        fuchsia: 'text-fuchsia-500 bg-fuchsia-500 active:bg-fuchsia-800',
        pink: 'text-pink-500 bg-pink-500 active:bg-pink-800',
        rose: 'text-rose-500 bg-rose-500 active:bg-rose-800',
        white: 'text-white bg-white active:bg-gray-300',
        gray: 'text-gray-300 bg-gray-300 active:bg-gray-800'
      }
    }
  }
}

export function Button({
  as = 'button',
  size = 'base',
  color = 'red',
  variant = 'primary',
  disabled,
  className,
  children,
  icon,
  ...props
}: ButtonProps & any) {
  return React.createElement(as, {
    ...props,
    className: clsx(
      className,
      ButtonClasses._,
      disabled && ButtonClasses.disabled._,
      icon
        ? ButtonClasses.icon.size[size as Sizes]
        : ButtonClasses.size[size as Sizes],
      ButtonClasses.variant[variant as ButtonVariants]._,
      ButtonClasses.variant[variant as ButtonVariants].color[color as Colors]
    ),
    children
  })
}
