/* istanbul ignore file */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PersistenceModule } from '~persistence/persistence.module';
import { NoteModule } from '~note/note.module';
import { UserModule } from '~user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    PersistenceModule,
    UserModule,
    NoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
