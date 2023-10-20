import { Module } from '@nestjs/common';
import { NoteController } from '~note/note.controller';
import { NoteService } from '~note/services/note.service';
import { NoteDatabaseService } from '~note/services/note-database.service';
import { NoteMoveService } from '~note/services/note-move.service';
import { NoteDeleteService } from '~note/services/note-delete.sevice';

@Module({
  controllers: [NoteController],
  providers: [
    NoteService,
    NoteDatabaseService,
    NoteMoveService,
    NoteDeleteService,
  ],
  exports: [NoteDatabaseService],
})
export class NoteModule {}
