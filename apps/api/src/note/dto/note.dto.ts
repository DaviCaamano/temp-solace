import { IsNotEmpty, IsOptional } from 'class-validator';
import { MoveNotePosition, NoteStatus } from '#interfaces/notes';

export class ListNotesDto {
  @IsNotEmpty()
  userId: string;
}

export class GetNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;
}

export class CreateNoteDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  parentId?: string;

  @IsOptional()
  next?: string;
}

export class UpdateNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  head?: string;

  @IsOptional()
  next?: string;

  @IsOptional()
  status?: NoteStatus;
}

export class MoveNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  position: MoveNotePosition;

  @IsOptional()
  targetId?: string;
}

export class DeleteNoteDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;

  @IsOptional()
  deleteChildren?: boolean;
}
