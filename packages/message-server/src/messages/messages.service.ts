import { Injectable } from '@nestjs/common'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'
import { Message, DeliveryMethod } from '@sammccord/message-client'
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid'
import { PrismaService } from 'src/modules'

@Injectable()
export class MessagesService {
  constructor(
    @InjectPinoLogger(MessagesService.name)
    private readonly logger: PinoLogger,
    @InjectSendGrid()
    private readonly sendgrid: SendGridService,
    private readonly prisma: PrismaService
  ) {}

  async deliverMessage(message: Message) {
    const { id, method, data, text, delivered } = message
    this.logger.debug(message)

    try {
      if (method === DeliveryMethod.EMAIL) {
        await this.sendgrid.send({
          to: data?.email,
          from: 'team@domain.com',
          subject: data?.subject || 'You have a new message!',
          html: text
        })
      }

      if (!delivered) {
        await this.prisma.message.update({
          where: {
            id
          },
          data: {
            delivered: true
          }
        })
      }
    } catch (e) {
      this.logger.error(
        { ...message, err: e },
        e.message || 'An unknown error occured'
      )
      throw e
    }

    this.logger.debug(message, `successfully processed message`)
  }
}
