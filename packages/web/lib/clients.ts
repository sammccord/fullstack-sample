import { Configuration, DefaultApi } from '@sammccord/message-client'

export enum CLIENTS {
  MESSAGES = 'MESSAGES'
}

export const messages = new DefaultApi(
  new Configuration({
    basePath: '/api/v1/messages'
  })
)

export const clients = {
  [CLIENTS.MESSAGES]: messages
}
