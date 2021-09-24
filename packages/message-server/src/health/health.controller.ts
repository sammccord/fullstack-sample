import { InjectQueue } from '@nestjs/bull'
import { Get, Controller } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  HealthCheckError
} from '@nestjs/terminus'
import { Queue } from 'bull'
import { PrismaService } from '../modules'

@Controller('health')
export class HealthController {
  constructor(
    @InjectQueue('messages') private readonly messagesQueue: Queue,
    private health: HealthCheckService,
    private prisma: PrismaService
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => {
        const isPaused = await this.messagesQueue.isPaused()
        if (isPaused)
          throw new HealthCheckError('Messages is paused for some reason', {
            messages: {
              error: {
                message: 'Messages is paused for some reason',
                ...(await this.messagesQueue.getJobCounts())
              },
              status: 'down'
            }
          })
        return {
          messages: {
            status: 'up',
            info: await this.messagesQueue.getJobCounts()
          }
        }
      },
      async () => {
        try {
          await this.prisma.message.findFirst()
          return {
            prisma: {
              status: 'up'
            }
          }
        } catch (e) {
          throw new HealthCheckError(e.message, {
            prisma: {
              status: 'down',
              error: {
                ...e
              }
            }
          })
        }
      }
    ])
  }
}
