import { createContext, Component } from 'react'
import cuid from 'cuid'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Button, Card, Colors } from '@sammccord/components'

interface NotificationProps {
  timeout?: boolean | number
  onClick?: () => void
  children: React.ReactNode
  type?: 'default' | 'success' | 'alert'
}

const notificationColor: { [type: string]: Colors } = {
  default: 'gray',
  success: 'emerald',
  alert: 'red'
}

export const notificationIcons = {
  default: (
    <svg
      className='h-6 w-6'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
  alert: (
    <svg
      className='h-6 w-6'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  ),
  success: (
    <svg
      className='h-6 w-6'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
      />
    </svg>
  )
}

const DEFAULT_NOTIFICATION_TIMEOUT = 5000

export interface INotificationContext {
  trigger: (notification: NotificationProps) => string
  handleTrigger: (notification: NotificationProps) => () => string
  clear: () => void
  remove: (id: string) => void
}

export const NotificationContext = createContext<INotificationContext>(null)

class Notifications extends Component {
  state: { notifications: { [id: string]: NotificationProps } } = {
    notifications: {}
  }

  public trigger = (notification: NotificationProps) => {
    const { notifications } = this.state
    const id = cuid()
    notifications[id] = notification
    this.setState({ notifications })
    if (notification.timeout !== false) {
      setTimeout(() => {
        this.remove(id)
      }, (notification.timeout as number) || DEFAULT_NOTIFICATION_TIMEOUT)
    }
    return id
  }

  public handleTrigger = (notification: NotificationProps) => () =>
    this.trigger(notification)

  public clear = () => {
    this.setState({ notifications: {} })
  }

  public remove = (id: string) => {
    const { notifications } = this.state
    delete notifications[id]
    this.setState({ notifications })
  }

  public handleRemove = (id: string) => () => this.remove(id)

  private _value: INotificationContext = {
    trigger: this.trigger,
    handleTrigger: this.handleTrigger,
    clear: this.clear,
    remove: this.remove
  }

  render() {
    const { notifications } = this.state
    return (
      <NotificationContext.Provider value={this._value}>
        <>
          <div className='fixed z-40 inset-0 flex flex-col items-end justify-start space-y-4 px-4 py-6 pointer-events-none sm:p-6'>
            {Object.entries(notifications).map(
              ([id, { children, type = 'default' }]) => (
                <Transition
                  key={id}
                  as={Card}
                  show
                  appear
                  variant='solid'
                  data-test='Notification'
                  color={notificationColor[type]}
                  className={clsx(
                    'text-white max-w-sm w-full shadow-lg pointer-events-auto overflow-hidden p-4'
                  )}
                  enter='transform ease-out duration-300 transition'
                  enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
                  enterTo='translate-y-0 opacity-100 sm:translate-x-0'
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      {notificationIcons[type]}
                    </div>
                    <div className='ml-3 w-0 flex-1 pt-0.5'>
                      <p className='font-semibold'>{children}</p>
                    </div>
                    <div className='ml-4 flex-shrink-0 flex'>
                      <Button
                        icon
                        variant='secondary'
                        size='xs'
                        color='white'
                        onClick={this.handleRemove(id)}
                      >
                        <span className='sr-only'>Close</span>
                        <svg
                          className='h-5 w-5'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </Transition>
              )
            )}
          </div>
          {this.props.children}
        </>
      </NotificationContext.Provider>
    )
  }
}

export default Notifications
