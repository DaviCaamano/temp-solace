import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: { url: process.env.POSTGRES_PRISMA_URL },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
