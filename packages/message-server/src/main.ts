import 'dotenv/config'
import { NestFactory } from '@nestjs/core'
import compression from 'compression'
import bodyParser from 'body-parser'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

const port = process.env.PORT || 3000

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false })
  app.useLogger(app.get(Logger))
  app.use(compression())
  app.use(bodyParser.json({ limit: '5mb' }))
  await app.listen(port)
  app.get(Logger).log(`Messages listening on port ${port}`)
}
bootstrap()
