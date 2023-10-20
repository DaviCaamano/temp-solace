import { Global, Logger, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { DatabaseService } from '~persistence/prisma/database.service';

@Global()
@Module({
  providers: [PrismaService, DatabaseService, Logger],
  exports: [PrismaService, DatabaseService, Logger],
})
export class PersistenceModule {}
