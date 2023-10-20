import { Module } from '@nestjs/common';
import { UserController } from '~user/user.controller';
import { UserService } from '~user/user.service';
import { UserDatabaseService } from '~user/user-database.service';
import { NoteModule } from '~note/note.module';

@Module({
  imports: [NoteModule],
  controllers: [UserController],
  providers: [UserService, UserDatabaseService],
})
export class UserModule {}
