import { useEffect } from 'react'
import { EVENTS } from '@sammccord/events'
import cuid from 'cuid'
import mixpanel from '../lib/mixpanelBrowser'
import { useLocalStorage } from 'react-use'

const id = cuid()
const userIdKey = 'userId'
let mixpanelInitialized: boolean = false

export default function useUser(): string {
  const [userId] = useLocalStorage(userIdKey, id)

  useEffect(() => {
    if (!!userId && !mixpanelInitialized) {
      try {
        mixpanel.people.increment(EVENTS.VISIT)
        mixpanel.identify(id)
        mixpanelInitialized = true
      } catch (e) {}
    }
  }, [userId])

  return userId
}
