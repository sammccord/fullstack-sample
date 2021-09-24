import React from 'react'
import clsx from 'clsx'
import { Colors } from '../colors'

export type CardVariants = 'outlined' | 'empty' | 'solid' | 'gradient'

export interface CardProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  color?: Colors
  variant?: CardVariants
  header?: React.ReactNode
  button?: Boolean
  level?: 0 | 1 | 2 | 3 | 4
}

export const CardClasses = {
  _: 'relative overflow-hidden rounded-lg',
  variant: {
    empty: {
      _: 'bg-transparent border-2 border-dashed border-gray-400 text-gray-400'
    },
    outlined: {
      _: 'border-2',
      color: {
        red: 'border-red-600',
        orange: 'border-orange-500',
        amber: 'border-amber-500',
        yellow: 'border-yellow-500',
        lime: 'border-lime-500',
        green: 'border-green-500',
        emerald: 'border-emerald-500',
        teal: 'border-teal-500',
        cyan: 'border-cyan-500',
        sky: 'border-sky-500',
        blue: 'border-blue-500',
        indigo: 'border-indigo-500',
        violet: 'border-violet-500',
        purple: 'border-purple-500',
        fuchsia: 'border-fuchsia-500',
        pink: 'border-pink-500',
        rose: 'border-rose-500',
        white: 'border-white',
        gray: 'border-gray-400'
      }
    },
    solid: {
      _: 'border-2',
      color: {
        red: 'text-black border-red-600 bg-red-600',
        orange: 'text-black border-orange-500 bg-orange-500',
        amber: 'text-black border-amber-500 bg-amber-500',
        yellow: 'text-black border-yellow-500 bg-yellow-500',
        lime: 'text-black border-lime-500 bg-lime-500',
        green: 'text-black border-green-500 bg-green-500',
        emerald: 'text-black border-emerald-500 bg-emerald-500',
        teal: 'text-black border-teal-500 bg-teal-500',
        cyan: 'text-black border-cyan-500 bg-cyan-500',
        sky: 'text-black border-sky-500 bg-sky-500',
        blue: 'text-black border-blue-500 bg-blue-500',
        indigo: 'text-black border-indigo-500 bg-indigo-500',
        violet: 'text-black border-violet-500 bg-violet-500',
        purple: 'text-black border-purple-500 bg-purple-500',
        fuchsia: 'text-black border-fuchsia-500 bg-fuchsia-500',
        pink: 'text-black border-pink-500 bg-pink-500',
        rose: 'text-black border-rose-500 bg-rose-500',
        white: 'text-black border-white bg-white',
        gray: 'text-black border-gray-400 bg-gray-400'
      }
    },
    gradient: {
      _: 'text-white bg-opacity-50 bg-gradient-to-r from-gray-900 via-gray-900',
      color: {
        red: 'bg-red-600',
        orange: 'bg-orange-500',
        amber: 'bg-amber-500',
        yellow: 'bg-yellow-500',
        lime: 'bg-lime-500',
        green: 'bg-green-500',
        emerald: 'bg-emerald-500',
        teal: 'bg-emerald-500',
        cyan: 'bg-cyan-500',
        sky: 'bg-sky-500',
        blue: ' bg-blue-500',
        indigo: 'bg-indigo-500',
        violet: 'bg-violet-500',
        purple: 'bg-purple-500',
        fuchsia: 'bg-fuchsia-500',
        pink: 'bg-pink-500 ',
        rose: 'bg-rose-500',
        white: 'bg-white',
        gray: 'bg-gray-400'
      }
    }
  },
  header: {
    _: 'px-3 py-2',
    color: {
      red: 'text-white bg-red-600',
      orange: 'text-black bg-orange-500',
      amber: 'text-black bg-amber-500',
      yellow: 'text-black bg-yellow-500',
      lime: 'text-black bg-lime-500',
      green: 'text-black bg-green-500',
      emerald: 'text-black bg-emerald-500',
      teal: 'text-black bg-teal-500',
      cyan: 'text-black bg-cyan-500',
      sky: 'text-black bg-sky-500',
      blue: 'text-black bg-blue-500',
      indigo: 'text-black bg-indigo-500',
      violet: 'text-black bg-violet-500',
      purple: 'text-black bg-purple-500',
      fuchsia: 'text-black bg-fuchsia-500',
      pink: 'text-black bg-pink-500',
      rose: 'text-black bg-rose-500',
      white: 'text-black bg-white',
      gray: 'text-black bg-gray-400'
    }
  },
  button: {
    _: 'cursor-pointer transform transition hover:-translate-y-0.5 hover:scale-101 active:translate-y-0.5 active:scale-99 focus:outline-none'
  },
  level: {
    0: '',
    1: 'bg-gray-900 shadow-sm',
    2: 'bg-gray-800 shadow',
    3: 'bg-gray-700 shadow-lg',
    4: 'bg-gray-600 shadow-xl'
  }
}

export const Card = React.forwardRef(
  (
    {
      color = 'white',
      variant,
      className,
      children,
      header,
      button,
      level = 0,
      ...props
    }: CardProps,
    ref
  ) => {
    return (
      <div
        {...props}
        ref={ref as any}
        className={clsx(
          className,
          CardClasses._,
          CardClasses.level[level],
          !!variant && CardClasses.variant[variant]._,
          !!variant &&
            variant !== 'empty' &&
            (CardClasses.variant as any)[variant].color[color],
          button && CardClasses.button._
        )}
      >
        <>
          {header && variant !== 'empty' && (
            <div
              className={clsx(
                CardClasses.header._,
                (CardClasses.header as any).color[color]
              )}
            >
              {header}
            </div>
          )}
          {children}
        </>
      </div>
    )
  }
)
