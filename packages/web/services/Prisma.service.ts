import { PrismaClient } from '@prisma/client'

export class PrismaService extends PrismaClient {
  private static _instance: PrismaService

  constructor() {
    super()
  }

  public static get instance(): PrismaService {
    if (!PrismaService._instance) {
      PrismaService._instance = new PrismaService()
    }

    return PrismaService._instance
  }
}
