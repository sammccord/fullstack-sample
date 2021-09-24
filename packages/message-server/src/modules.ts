import { OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { PrismaClient } from '@prisma/client'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthGuard } from '@nestjs/passport'
import { MailService } from '@sendgrid/mail'

export const production =
  process.env.NODE_ENV === 'production' && process.env.ENV === 'production'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.MESSAGES_API_SECRET || 'test'
    })
  }

  async validate(payload: any) {
    return payload
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class SendgridService extends MailService {
  constructor() {
    super()
    this.setApiKey(process.env.SENDGRID_KEY)
  }
}
