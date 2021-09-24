import { DeliveryMethod, TemplateName } from '@sammccord/message-client'
import { VercelResponse } from '@vercel/node'
import Ajv from 'ajv'
import schema from '@sammccord/message-client/dist/openapi.json'
import { ExtendedRequest } from '../interfaces'
import { MessageService } from '../services/Message.service'
import { PrismaService } from '../services/Prisma.service'

const ajv = new Ajv({ strict: false })
ajv.addSchema(schema, 'openapi.json')

export async function listTemplates(
  req: ExtendedRequest<{ method: DeliveryMethod }>,
  res: VercelResponse
) {
  const templates = await MessageService.instance.listTemplates(
    req.params.method
  )
  return res.status(200).json(templates)
}

export async function getTemplate(
  req: ExtendedRequest<{ method: DeliveryMethod; name: TemplateName }>,
  res: VercelResponse
) {
  const templates = await MessageService.instance.getTemplate(
    req.params.method,
    req.params.name
  )
  return res.status(200).json(templates)
}

export async function sendMessage(req: ExtendedRequest, res: VercelResponse) {
  const valid = ajv.validate(
    { $ref: 'openapi.json#/components/schemas/MessageInput' },
    req.body
  )
  if (!valid) {
    throw {
      status: 400,
      message: ajv.errorsText()
    }
  }
  const { data } = await MessageService.instance.sendMessage(req.body)
  return res.status(200).json(data)
}

export async function getMessages(
  req: ExtendedRequest<{ userId: string }>,
  res: VercelResponse
) {
  const messages = await PrismaService.instance.message.findMany({
    where: {
      userId: decodeURIComponent(req.params.userId),
      delivered: true
    },
    orderBy: {
      deliverAt: 'desc'
    }
  })
  return res.status(200).json(messages)
}
