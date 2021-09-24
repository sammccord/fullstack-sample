import { InjectQueue } from '@nestjs/bull'
import { Response } from 'express'
import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Res
} from '@nestjs/common'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'
import { DeliveryMethod } from '@prisma/client'
import { MessageInput } from '@sammccord/message-client'
import { Queue } from 'bull'
import { PrismaService, JwtAuthGuard } from '../modules'
import { TemplateService } from '../template.service'

const defaultBullOpts = {
  removeOnComplete: true,
  removeOnFail: true,
  timeout: 10000,
  attempts: 10,
  backoff: {
    type: 'fixed',
    delay: 10000
  }
}

@Controller('messages')
export class MessagesController {
  constructor(
    @InjectPinoLogger(MessagesController.name)
    private readonly logger: PinoLogger,
    @InjectQueue('messages') private readonly messagesQueue: Queue,
    private readonly prisma: PrismaService,
    private readonly template: TemplateService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMessage(@Body() message: MessageInput, @Res() res: Response) {
    try {
      this.logger.debug(message)
      let { userId, method, text, deliverAt } = message

      if (!text) {
        text = (await this.template.render(message)) as string
        if (!text)
          throw new Error('Templating engine returned no compiled message')
      }

      const deliverIn =
        new Date(deliverAt || 0).valueOf() - new Date().valueOf()
      const autoDeliver = method === DeliveryMethod.WEBSITE && deliverIn <= 0
      const created = await this.prisma.message.create({
        data: {
          userId,
          method: method as DeliveryMethod,
          text,
          deliverAt,
          delivered: autoDeliver
        }
      })

      if (deliverIn > 0) {
        await this.messagesQueue.add(
          created,
          deliverIn > 0
            ? {
                ...defaultBullOpts,
                delay: deliverIn
              }
            : defaultBullOpts
        )
      }

      return res.status(200).json(created)
    } catch (e) {
      throw new HttpException(
        e.message || 'Failed to send message',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
