import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import redisUrlParse from 'redis-url-parse'
import { LoggerModule } from 'nestjs-pino'
import { ScheduleModule } from '@nestjs/schedule'
import { TerminusModule } from '@nestjs/terminus'
import { SendGridModule } from '@ntegral/nestjs-sendgrid'
import { HealthController } from './health/health.controller'
import { PrismaService } from './modules'
import { MessagesController } from './messages/messages.controller'
import { MessagesProcessor } from './messages/messages.processor'
import { TemplateService } from './template.service'
import { AuthModule } from './auth.module'
import { MessagesService } from './messages/messages.service'
import { TemplatesController } from './templates/templates.controller'

@Module({
  imports: [
    AuthModule,
    LoggerModule.forRoot(),
    ScheduleModule.forRoot(),
    TerminusModule,
    BullModule.forRootAsync({
      useFactory: () => {
        if (process.env.NODE_ENV === 'production') {
          const { host, port, password } = redisUrlParse(process.env.REDIS_URL)
          return {
            redis: {
              username: 'default',
              password,
              host,
              port
            }
          }
        } else {
          return {
            redis: process.env.REDIS_URL
          }
        }
      }
    }),
    BullModule.registerQueue({
      name: 'messages'
    }),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_KEY
    })
  ],
  controllers: [HealthController, MessagesController, TemplatesController],
  providers: [
    PrismaService,
    TemplateService,
    MessagesProcessor,
    MessagesService
  ]
})
export class AppModule {}
