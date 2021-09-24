import { Process, Processor } from '@nestjs/bull'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'
import { Job } from 'bull'
import { Message } from '@sammccord/message-client'
import { MessagesService } from './messages.service'

@Processor('messages')
export class MessagesProcessor {
  constructor(
    @InjectPinoLogger(MessagesProcessor.name)
    private readonly logger: PinoLogger,
    private readonly messagesService: MessagesService
  ) {}

  @Process()
  async handleMessage(job: Job<Message>) {
    const message = job.data
    this.logger.debug(message)

    try {
      await this.messagesService.deliverMessage(message)
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
