import React from 'react'
import clsx from 'clsx'
import { Sizes } from '../sizes'
import { Colors } from '../colors'

type TagVariants = 'primary' | 'secondary' | 'basic'

export interface TagProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  size?: Sizes
  color?: Colors
  variant?: TagVariants
  icon?: boolean
}

export const TagClasses = {
  _: 'inline-flex items-center font-bold uppercase shadow-sm',
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
  variant: {
    primary: {
      _: 'rounded-lg shadow-sm',
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
        white: 'text-black bg-gray-100',
        gray: 'text-black bg-gray-400',
        twitch: 'text-white bg-twitch',
        mw: 'text-white bg-mw',
        battle: 'text-white bg-battle',
        xbl: 'text-white bg-xbl',
        uno: 'ring ring-inset ring-white text-white bg-uno',
        psn: 'text-white bg-psn',
        discord: 'text-white bg-discord'
      }
    },
    secondary: {
      _: 'border-2 bg-opacity-0 rounded-lg',
      color: {
        red: 'text-red-600 border-red-600 bg-red-600',
        orange: 'text-orange-500 border-orange-500 bg-orange-500',
        amber: 'text-amber-500 border-amber-500 bg-amber-500',
        yellow: 'text-yellow-500 border-yellow-500 bg-yellow-500',
        lime: 'text-lime-500 border-lime-500 bg-lime-500 ',
        green: 'text-green-500 border-green-500 bg-green-500',
        emerald: 'text-emerald-500 border-emerald-500 bg-emerald-500',
        teal: 'text-teal-500 border-teal-500 bg-teal-500',
        cyan: 'text-cyan-500 border-cyan-500 bg-cyan-500',
        sky: 'text-sky-500 border-sky-500 bg-sky-500',
        blue: 'text-blue-500 border-blue-500 bg-blue-500',
        indigo: 'text-indigo-500 border-indigo-500 bg-indigo-500',
        violet: 'text-violet-500 border-violet-500 bg-violet-500',
        purple: 'text-purple-500 border-purple-500 bg-purple-500',
        fuchsia: 'text-fuchsia-500 border-fuchsia-500 bg-fuchsia-500',
        pink: 'text-pink-500 border-pink-500 bg-pink-500',
        rose: 'text-rose-500 border-rose-500 bg-rose-500',
        white: 'text-white border-white bg-white',
        gray: 'text-gray-300 border-gray-300 bg-gray-300',
        twitch: 'text-twitch border-twitch bg-purple-500',
        mw: 'text-mw border-mw bg-blueGray-500',
        battle: 'text-battle border-battle bg-sky-500',
        xbl: 'text-xbl border-xbl bg-green-500',
        uno: 'text-white border-white bg-gray-500',
        psn: 'text-psn border-psn bg-blue-500',
        discord: 'text-discord border-discord bg-indigo-500'
      }
    },
    basic: {
      _: 'bg-opacity-0 rounded-lg',
      color: {
        red: 'text-red-600 bg-red-600',
        orange: 'text-orange-500 bg-orange-500',
        amber: 'text-amber-500 bg-amber-500',
        yellow: 'text-yellow-500 bg-yellow-500',
        lime: 'text-lime-500 bg-lime-500',
        green: 'text-green-500 bg-green-500',
        emerald: 'text-emerald-500 bg-emerald-500',
        teal: 'text-teal-500 bg-teal-500',
        cyan: 'text-cyan-500 bg-cyan-500',
        sky: 'text-sky-500 bg-sky-500',
        blue: 'text-blue-500 bg-blue-500',
        indigo: 'text-indigo-500 bg-indigo-500',
        violet: 'text-violet-500 bg-violet-500',
        purple: 'text-purple-500 bg-purple-500',
        fuchsia: 'text-fuchsia-500 bg-fuchsia-500',
        pink: 'text-pink-500 bg-pink-500',
        rose: 'text-rose-500 bg-rose-500',
        white: 'text-white bg-white',
        gray: 'text-gray-300 bg-gray-300',
        twitch: 'text-twitch bg-purple-500',
        mw: 'text-mw border-mw',
        battle: 'text-battle bg-sky-500 ',
        xbl: 'text-xbl bg-green-500',
        uno: 'text-white bg-gray-500',
        psn: 'text-psn bg-blue-500',
        discord: 'text-discord bg-indigo-500'
      }
    }
  }
}

export function Tag({
  size = 'base',
  color = 'red',
  variant = 'primary',
  disabled,
  className,
  children,
  icon,
  ...props
}: TagProps) {
  return (
    <div
      className={clsx(
        className,
        TagClasses._,
        icon
          ? TagClasses.icon.size[size as Sizes]
          : TagClasses.size[size as Sizes],
        TagClasses.variant[variant as TagVariants]._,
        TagClasses.variant[variant as TagVariants].color[color as Colors]
      )}
    >
      {children}
    </div>
  )
}
