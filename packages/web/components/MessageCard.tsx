import { MessageType, Message } from '@prisma/client'
import { Card, Colors } from '@sammccord/components'
import {
  InformationCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/outline'
import dayjs from '../lib/dayjs'
import React from 'react'

const messageTypeToCardColor: { [type in MessageType]: Colors } = {
  [MessageType.INFO]: 'white',
  [MessageType.WARN]: 'amber',
  [MessageType.ERROR]: 'red',
  [MessageType.SUCCESS]: 'emerald'
}

function MessageTypeIcon({
  type,
  ...props
}: { type: MessageType } & React.ComponentProps<'svg'>) {
  switch (type) {
    case MessageType.INFO:
      return <InformationCircleIcon {...props} />
    case MessageType.WARN:
      return <ExclamationCircleIcon {...props} />
    case MessageType.ERROR:
      return <XCircleIcon {...props} />
    case MessageType.SUCCESS:
      return <CheckCircleIcon {...props} />
    default:
      return <InformationCircleIcon {...props} />
  }
}

export default function MessageCard({
  message,
  ...props
}: {
  message: Message
}) {
  return (
    <Card
      {...props}
      data-test='MessageCard'
      id={message.id}
      className='p-4 text-white'
      variant='outlined'
      color={messageTypeToCardColor[message.type]}
    >
      <div className='flex items-center mb-2'>
        <MessageTypeIcon type={message.type} className='w-7 mr-2' />
        <span className='text-gray-400'>
          Sent {dayjs.utc(message.deliverAt).fromNow()}
        </span>
      </div>
      <div
        className='text-2xl'
        dangerouslySetInnerHTML={{ __html: message.text }}
      />
    </Card>
  )
}
