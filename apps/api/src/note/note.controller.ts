import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { NoteService } from './services/note.service';
import { CreateNoteDto, DeleteNoteDto, GetNoteDto, ListNotesDto, MoveNoteDto, UpdateNoteDto } from '~note/dto/note.dto';
import { SuccessNoteResponse, ListNotesResponse, NoteResponse, DeleteNoteResponse } from '#interfaces/notes';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('list')
  list(@Query() { userId }: ListNotesDto): Promise<ListNotesResponse> {
    return this.noteService.list(userId);
  }

  @Get()
  get(@Query() { id, userId }: GetNoteDto): Promise<NoteResponse> {
    return this.noteService.get(id, userId);
  }

  @Post()
  create(@Body() newNote: CreateNoteDto): Promise<NoteResponse> {
    return this.noteService.create(newNote);
  }

  @Put()
  update(@Body() updatedNote: UpdateNoteDto): Promise<NoteResponse> {
    return this.noteService.update(updatedNote);
  }

  @Put('move')
  move(@Body() moveNoteData: MoveNoteDto): Promise<NoteResponse> {
    return this.noteService.move(moveNoteData);
  }

  @Delete()
  delete(@Body() { id, userId, deleteChildren }: DeleteNoteDto): Promise<DeleteNoteResponse> {
    return this.noteService.delete(id, userId, deleteChildren);
  }

  @Get('reset')
  reset(): Promise<SuccessNoteResponse> {
    return this.noteService.reset();
  }
}
