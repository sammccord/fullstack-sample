import { EVENTS } from '@sammccord/events'
import { VercelResponse } from '@vercel/node'
import Mixpanel from 'mixpanel'
import { ExtendedRequest } from '../interfaces'
import { PUBLIC_URL, ENV } from '../lib/constants'

export async function sendEvent(req: ExtendedRequest, res: VercelResponse) {
  const { event, message, escalate, ...other } = req.body
  if (!event || !EVENTS[event])
    throw { status: 400, message: 'Valid "event" property required to track' }
  const payload = {
    ...other,
    event,
    ENV,
    PUBLIC_URL,
    ip:
      ((req.headers['x-forwarded-for'] as string) || '').split(',')[0] ||
      req.socket.remoteAddress
  }
  req.log.debug({ event: payload })
  // for this example, we wont have a full mixpanel setup, but tracking these events serverside ensures they won't get lost from adblockers
  if (process.env.NEXT_PUBLIC_MIXPANEL_TOKEN) {
    const mixpanel = Mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN)
    mixpanel.track(event, payload)
  }
  return res.status(200).json(payload)
}
