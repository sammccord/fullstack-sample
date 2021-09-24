import { Response } from 'express'
import {
  Controller,
  UseGuards,
  HttpException,
  HttpStatus,
  Res,
  Get,
  Param
} from '@nestjs/common'
import { DeliveryMethod } from '@sammccord/message-client'
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino'
import { JwtAuthGuard } from '../modules'
import { TemplateService } from '../template.service'
import { get, isEmpty } from 'lodash'

@Controller('templates')
export class TemplatesController {
  constructor(
    @InjectPinoLogger(TemplatesController.name)
    private readonly logger: PinoLogger,
    private readonly template: TemplateService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':method')
  async listTemplates(
    @Param('method') method: DeliveryMethod,
    @Res() res: Response
  ) {
    try {
      const templates = Object.values(get(this.template.templates, method, {}))
      if (isEmpty(templates))
        return res.status(404).json({ message: 'Not found' })
      return res.status(200).json(templates)
    } catch (e) {
      throw new HttpException(
        e.message || 'Failed to send message',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':method/:name')
  async getTemplate(
    @Param('method') method: DeliveryMethod,
    @Param('name') name: string,
    @Res() res: Response
  ) {
    try {
      const template = get(this.template, [method, name])
      if (!template) return res.status(404).json({ message: 'Not found' })
      return res.status(200).json(template)
    } catch (e) {
      throw new HttpException(
        e.message || 'Failed to send message',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
