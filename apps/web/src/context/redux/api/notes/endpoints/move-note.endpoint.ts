import { Note, NoteResponse, NoteUpdate } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { MoveNoteDto } from '~note/dto/note.dto';

export const moveNoteEndpoint = (builder: ReduxQueryBuilder) =>
  builder.mutation<Note, MoveNoteDto>({
    query: (note: NoteUpdate) => ({
      url: '/note/move',
      method: HttpMethod.put,
      body: note,
    }),
    transformResponse: (resp: NoteResponse): Note => resp.note,
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
