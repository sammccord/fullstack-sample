import { Card } from '@sammccord/components'
import clsx from 'clsx'

interface EmptyProps {
  children?: React.ReactNode
  className?: string
}

export default function Empty({
  children,
  className = 'sm:p-8 text-4xl p-4'
}: EmptyProps) {
  return (
    <Card variant='empty'>
      <div
        className={clsx(
          'flex flex-1 p-4 leading-tight text-center justify-center items-center rounded-sm',
          className
        )}
      >
        {children || 'Nothing to see here, check back later'}
      </div>
    </Card>
  )
}
