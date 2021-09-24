import { Modal } from '../src/components/Modal'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'

export default function MyModal() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className='fixed inset-0 flex items-center justify-center'>
        <button
          type='button'
          onClick={openModal}
          className='px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        >
          Open dialog
        </button>
      </div>

      <Modal open={isOpen} onClose={closeModal} variant='gradient' color='red'>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 text-gray-100'
        >
          Payment successful
        </Dialog.Title>
        <div className='mt-2'>
          <p className='text-sm text-gray-400'>
            Your payment has been successfully submitted. We’ve sent your an
            email with all of the details of your order.
          </p>
        </div>

        <div className='mt-4'>
          <button
            type='button'
            className='inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
            onClick={closeModal}
          >
            Got it, thanks!
          </button>
        </div>
      </Modal>
    </>
  )
}
