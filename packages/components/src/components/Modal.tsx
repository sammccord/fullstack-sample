import { Transition, Dialog } from '@headlessui/react'
import clsx from 'clsx'
import React, { Fragment } from 'react'
import { Card, CardProps } from './Card'

export interface ModalProps extends CardProps {
  open: boolean
  onClose: () => any
}

export function Modal({
  open,
  onClose,
  className,
  children,
  ...props
}: ModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={onClose}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-50' />
          </Transition.Child>

          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-110'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Card
              {...(props as any)}
              className={clsx(
                'inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform',
                className
              )}
            >
              {children}
            </Card>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
