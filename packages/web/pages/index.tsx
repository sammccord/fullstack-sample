import { useCallback } from 'react'
import { FORM_ERROR } from 'final-form'
import { Form } from 'react-final-form'
import CopyToClipboard from 'react-copy-to-clipboard'
import {
  ChartSquareBarIcon,
  ClipboardCopyIcon,
  RefreshIcon,
  SparklesIcon,
  SortDescendingIcon,
  DotsHorizontalIcon,
  PencilAltIcon,
  BadgeCheckIcon
} from '@heroicons/react/outline'
import ms from 'ms'
import { Button, Card } from '@sammccord/components'
import Error from '../components/Error'
import { DeliveryMethod } from '@sammccord/message-client'
import { capitalize, isEmpty } from 'lodash'
import { messages } from '../lib/clients'
import FieldInput from '../components/FieldInput'
import FieldCheckbox from '../components/FieldCheckbox'
import useUser from '../hooks/useUser'
import MessageCard from '../components/MessageCard'
import useSWR from 'swr'
import useEvent from '../hooks/useEvent'
import { EVENTS } from '@sammccord/events'
import Empty from '../components/Empty'
import useNotifications from '../hooks/useNotifications'

const IndexPage = () => {
  const userId = useUser()
  const event = useEvent(EVENTS.CREATE_MESSAGE)
  const notifications = useNotifications()
  const {
    data: myMessages,
    mutate,
    revalidate
  } = useSWR(!!userId ? `/messages/${userId}` : null)

  const handleSubmit = useCallback(
    async ({ sendLater, unit, duration, ...messageInput }) => {
      try {
        if (sendLater) {
          messageInput.deliverAt = new Date(
            Date.now() + ms(`${duration} ${unit}`)
          ).toISOString()
        }
        const { data: message } = await messages.sendMessage(messageInput)
        notifications.trigger({
          type: 'success',
          children: 'Successfully created message!'
        })
        if (message.userId === userId && message.delivered) {
          mutate((_messages) => [message, ..._messages])
        }
        event.convert()
      } catch (e) {
        event.fail()
        return {
          [FORM_ERROR]: e.response?.data?.error?.message || e.message
        }
      }
    },
    [userId, mutate, event, notifications]
  )

  return (
    <>
      <div className='relative min-h-screen flex flex-col'>
        {/* <!-- 3 column wrapper --> */}
        <div className='flex-grow w-full mx-auto md:px-16 lg:flex'>
          {/* <!-- Left sidebar & main wrapper --> */}
          <div className='flex-1 min-w-0 xl:flex'>
            {/* <!-- App Overview --> */}
            <div className='xl:flex-shrink-0 xl:w-64'>
              <div className='pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1 space-y-6'>
                    <div className='space-y-6 space-x-4 sm:space-y-0 sm:space-x-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-6'>
                      {/* <!-- Title --> */}
                      <img
                        src='android-chrome-192x192.png'
                        className='w-24 m-auto text-rose-600'
                      />
                      <h1 className='text-center text-white text-5xl uppercase font-bold'>
                        MSNGR
                      </h1>
                      <p className='px-2 text-center text-gray-300'>
                        Read and leave messages. <br />
                        Timeboxed to 2 days as a fullstack code sample. This is
                        not intended to be a useful application so plz don't use
                        it as such.
                        <br />
                      </p>
                    </div>
                    {/* <!-- Meta info --> */}
                    <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-4'>
                      <h3 className='flex items-center justify-center text-white uppercase font-semibold'>
                        Features
                      </h3>
                      <div className='flex items-center justify-center space-x-2 text-gray-400'>
                        <BadgeCheckIcon className='h-5 w-5' />
                        <span className='text-sm font-medium'>
                          Typescript Monorepo
                        </span>
                      </div>
                      <div className='flex items-center justify-center space-x-2 text-gray-400'>
                        <PencilAltIcon className='h-5 w-5' />
                        <span className='text-sm font-medium'>
                          Spec Driven Tooling
                        </span>
                      </div>
                      <div className='flex items-center justify-center space-x-2 text-gray-400'>
                        <SparklesIcon className='h-5 w-5' />
                        <span className='text-sm font-medium'>
                          Tailwind UI Library
                        </span>
                      </div>
                      <div className='flex items-center justify-center space-x-2 text-gray-400'>
                        <SortDescendingIcon className='h-5 w-5' />
                        <span className='text-sm font-medium'>
                          Queue Processing
                        </span>
                      </div>
                      <div className='flex items-center justify-center space-x-2 text-gray-400'>
                        <ChartSquareBarIcon className='h-5 w-5' />
                        <span className='text-sm font-medium'>
                          Conversion Tracking API
                        </span>
                      </div>
                      <div className='flex items-center justify-center space-x-2 text-gray-400'>
                        <DotsHorizontalIcon className='h-5 w-5' />
                        <span className='text-sm font-medium'>
                          and many more!
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Messages Section --> */}
            <div className='lg:min-w-0 lg:flex-1 px-6'>
              <div className='space-y-10 pl-4 pr-6 pt-8 pb-4 sm:pl-6 lg:pl-8 xl:pl-6 xl:pt-10'>
                <CopyToClipboard text={userId} data-test='copyUserId'>
                  <Card
                    color='rose'
                    variant='solid'
                    button
                    className='w-full flex items-center px-4 py-3 text-2xl uppercase font-bold'
                  >
                    <div className='flex-1'>
                      MY ID IS <u data-test='userId'>{userId}</u>
                    </div>
                    <ClipboardCopyIcon className='w-8' />
                  </Card>
                </CopyToClipboard>

                <div className='flex items-center'>
                  <h1 className='flex-1 text-3xl text-white font-bold uppercase'>
                    MSGS left for me
                  </h1>
                  <Button
                    variant='secondary'
                    color='rose'
                    icon
                    onClick={revalidate}
                  >
                    <RefreshIcon className='w-5' />
                  </Button>
                </div>
              </div>
              <div className='p-6 space-y-6'>
                {!myMessages || (isEmpty(myMessages) && <Empty />)}
                {(myMessages || []).map((message) => (
                  <MessageCard key={message.id} message={message as any} />
                ))}
              </div>
            </div>
          </div>
          {/* <!-- Form --> */}
          <div className='pr-8 sm:pr-10 lg:pr-12 lg:flex-shrink-0 xl:pr-0'>
            <div className='pl-6 lg:w-80'>
              <div className='pt-6 pb-4'>
                <h2 className='text-white text-xl text-right uppercase font-bold'>
                  Leave a MSG
                </h2>
              </div>
              <div>
                <Form
                  initialValues={{
                    userId,
                    method: DeliveryMethod.WEBSITE,
                    unit: 'seconds'
                  }}
                  onSubmit={handleSubmit}
                  render={({
                    handleSubmit,
                    submitting,
                    pristine,
                    submitError,
                    values
                  }) => (
                    <form
                      id='form'
                      data-test='form'
                      className='space-y-6'
                      action='#'
                      method='POST'
                      onFocus={() => event.engage()}
                      onSubmit={handleSubmit}
                    >
                      {submitError && (
                        <Error error={submitError} data-test='submitError' />
                      )}

                      <FieldInput
                        id='userId'
                        name='userId'
                        label='Recipient ID'
                        type='text'
                        color='rose'
                        required
                      />

                      <FieldInput
                        as='select'
                        id='method'
                        name='method'
                        label='Delivery Method'
                        color='rose'
                        required
                      >
                        {Object.values(DeliveryMethod).map((method) => (
                          <option value={method} key={method}>
                            {capitalize(method)}
                          </option>
                        ))}
                      </FieldInput>

                      <FieldInput
                        as='textarea'
                        rows={4}
                        id='text'
                        name='text'
                        label='Message'
                        type='text'
                        color='rose'
                        required
                      />

                      <FieldCheckbox
                        color='rose'
                        size='lg'
                        id='sendLater'
                        name='sendLater'
                        label='Send Later?'
                        type='checkbox'
                      />

                      {values.sendLater && (
                        <div className='flex space-x-2 pt-2'>
                          <FieldInput
                            id='duration'
                            name='duration'
                            label='How long'
                            type='number'
                            min={1}
                            max={99}
                            color='rose'
                            className='flex-1'
                          />
                          <FieldInput
                            as='select'
                            id='unit'
                            name='unit'
                            color='rose'
                            className='flex-1'
                          >
                            {['seconds', 'minutes', 'hours', 'days'].map(
                              (unit) => (
                                <option value={unit} key={unit}>
                                  {capitalize(unit)}
                                </option>
                              )
                            )}
                          </FieldInput>
                        </div>
                      )}

                      <Button
                        color='rose'
                        className='w-full justify-center'
                        disabled={submitting || pristine}
                      >
                        Submit
                      </Button>
                    </form>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IndexPage
