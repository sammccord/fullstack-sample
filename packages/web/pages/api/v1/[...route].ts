import Trouter from 'trouter'
import { isNumber, first } from 'lodash'
import { VercelResponse } from '@vercel/node'
import { chain } from '@amaurym/now-middleware'
import { log } from '../../../lib/middleware'
import { ExtendedRequest } from '../../../interfaces'
import * as indexController from '../../../controllers/index'
import * as messagesController from '../../../controllers/messages'

const router = new Trouter()

router.post('/api/v1/e', log('sendEvent'), indexController.sendEvent)

router.get(
  '/api/v1/messages/templates/:method',
  log('listTemplates'),
  messagesController.listTemplates
)

router.get(
  '/api/v1/messages/templates/:method/:name',
  log('getTemplate'),
  messagesController.getTemplate
)

router.post(
  '/api/v1/messages/messages',
  log('sendMessage'),
  messagesController.sendMessage
)

router.get(
  '/api/v1/messages/:userId',
  log('getMessages'),
  messagesController.getMessages
)

function errorHandler(fn) {
  return async (req, res) => {
    try {
      await fn(req, res)
    } catch (e) {
      if (req.log) req.log.error(e)
      return res.status(isNumber(e.status) ? e.status : 400).json({
        error: { message: e.message || 'An unknown error occured', ...e }
      })
    }
  }
}

export default function handle(req: ExtendedRequest, res: VercelResponse) {
  let obj = router.find(req.method, first(req.url.split('?')))
  try {
    if (!obj?.handlers) throw { status: 404, message: 'Not Found' }
    req.params = obj.params || {}
    chain(...(obj.handlers.slice(0, obj.handlers.length - 1) as any))(
      errorHandler(obj.handlers[obj.handlers.length - 1] as any)
    )(req, res)
  } catch (e) {
    if (req.log) req.log.error(e)
    return res.status(isNumber(e.status) ? e.status : 400).json({
      error: { message: e.message || 'An unknown error occured', ...e }
    })
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5mb'
    },
    externalResolver: true
  }
}
