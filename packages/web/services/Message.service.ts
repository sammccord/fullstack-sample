import { Configuration, DefaultApi } from '@sammccord/message-client'
import jwt from 'jsonwebtoken'

export class MessageService extends DefaultApi {
  private static _instance: MessageService

  constructor(token: string) {
    super(
      new Configuration({
        basePath: process.env.MESSAGES_URL,
        accessToken: token
      })
    )
  }

  public static get instance(): MessageService {
    if (!MessageService._instance) {
      MessageService._instance = new MessageService(
        jwt.sign({}, process.env.MESSAGES_API_SECRET)
      )
    }

    return MessageService._instance
  }
}
