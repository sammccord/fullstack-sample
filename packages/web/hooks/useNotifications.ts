import { useContext } from 'react'
import { NotificationContext } from '../components/Notifications'

export default function useNotifications() {
  return useContext(NotificationContext)
}
