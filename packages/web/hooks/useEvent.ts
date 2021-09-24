import { EVENTS, EVENT_STATUS } from '@sammccord/events'
import { post } from '../lib/fetch'
import { SESSION_ID } from '../lib/constants'
import { useCallback, useMemo } from 'react'
import useUser from './useUser'

export interface EventDispatcher<T> {
  fail: (props?: T) => Promise<T>
  reject: (props?: T) => Promise<T>
  engage: (props?: T) => Promise<T>
  convert: (props?: T) => Promise<T>
  send: (props?: T) => Promise<T>
}

const eventsEndpoint = '/e'

export default function useEvent<T>(event: EVENTS): EventDispatcher<T> {
  const userId = useUser()

  const userProps = useMemo(
    () => (!!userId ? { distinct_id: userId } : {}),
    [userId]
  )

  const fail = useCallback(
    (props) =>
      post(eventsEndpoint, {
        ...userProps,
        ...props,
        session: SESSION_ID,
        status: EVENT_STATUS.FAILED,
        event
      }),
    [event, userProps]
  )

  const reject = useCallback(
    (props) =>
      post(eventsEndpoint, {
        ...userProps,
        ...props,
        session: SESSION_ID,
        status: EVENT_STATUS.REJECTED,
        event
      }),
    [event, userProps]
  )

  const engage = useCallback(
    (props) =>
      post(eventsEndpoint, {
        ...userProps,
        ...props,
        session: SESSION_ID,
        status: EVENT_STATUS.ENGAGED,
        event
      }),
    [event, userProps]
  )

  const convert = useCallback(
    (props) =>
      post(eventsEndpoint, {
        ...userProps,
        ...props,
        session: SESSION_ID,
        status: EVENT_STATUS.CONVERTED,
        event
      }),
    [event, userProps]
  )

  const send = useCallback(
    (props) =>
      post(eventsEndpoint, {
        ...userProps,
        ...props,
        session: SESSION_ID,
        event
      }),
    [event, userProps]
  )

  const dispatcher = useMemo(
    () => ({ fail, reject, engage, convert, send }),
    [fail, reject, engage, convert, send]
  )

  return dispatcher
}
