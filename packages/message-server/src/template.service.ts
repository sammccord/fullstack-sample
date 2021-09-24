import path from 'path'
import glob from 'glob'
import fs from 'fs'
import { Injectable } from '@nestjs/common'
import {
  MessageInput,
  DeliveryMethod,
  Template
} from '@sammccord/message-client'
import * as eta from 'eta'
import { first, get, set } from 'lodash'
import fm from 'front-matter'

eta.configure({
  views: path.resolve(process.cwd(), 'templates')
})

@Injectable()
export class TemplateService {
  private readonly _templates: {
    [method in DeliveryMethod]: {
      [name: string]: Template
    }
  } = {
    [DeliveryMethod.EMAIL]: {},
    [DeliveryMethod.SMS]: {},
    [DeliveryMethod.WEBSITE]: {}
  }

  constructor() {
    const files = glob.sync(
      `${process.cwd()}/templates/+(email|sms|website)/*.eta`
    )
    files.forEach((fileName) => {
      const { attributes, body } = fm(fs.readFileSync(fileName, 'utf8'))
      const parts = fileName.split('/')
      let [method, name] = parts.slice(parts.length - 2, parts.length)
      method = method.toUpperCase()
      name = first(name.split('.'))
      set(this.templates, [method, name], {
        method,
        name,
        variables: attributes,
        text: body
      })
    })
  }

  public get templates() {
    return this._templates
  }

  async render({
    name,
    method,
    template,
    data
  }: MessageInput): Promise<string | void> {
    if (template) {
      return eta.renderAsync(template, data)
    }

    return eta.renderAsync(get(this.templates, [method, name, 'text']), data, {
      cache: true
    })
  }
}
