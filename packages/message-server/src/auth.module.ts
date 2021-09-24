import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './modules'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.MESSAGES_API_SECRET || 'test',
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [JwtStrategy],
  exports: []
})
export class AuthModule {}
