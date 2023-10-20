import { Injectable, Logger } from '@nestjs/common';
import { ComponentWithLogging } from '~utils/logging';
import { LoginResponse, User } from '#interfaces/user/user.interface';
import { UserDatabaseService } from '~user/user-database.service';
import { LoginDto } from '~user/dto';
import { NoteDatabaseService } from '~note/services/note-database.service';
import { DatabaseService } from '~persistence/prisma/database.service';

@Injectable()
export class UserService extends ComponentWithLogging {
  constructor(
    private readonly db: DatabaseService,
    private readonly dbService: UserDatabaseService,
    private readonly logger: Logger,
    private readonly noteDbService: NoteDatabaseService,
  ) {
    super();

    this.setLogs({
      debug: (...args: any) => logger.debug(args),
      error: (...args: any) => logger.error(args),
      log: (...args: any) => logger.log(args),
      warn: (...args: any) => logger.warn(args),
      verbose: (...args: any) => logger.verbose(args),
    });
  }

  async login(user: LoginDto): Promise<LoginResponse> {
    let userRecord: User | undefined = await this.db.user.findUnique({
      where: { zeroId: user.zeroId },
    });

    if (!userRecord) {
      userRecord = await this.dbService.upsert(user);
      await this.noteDbService.addDefaultNotes(userRecord.id);
    }

    return { user: userRecord };
  }
}
