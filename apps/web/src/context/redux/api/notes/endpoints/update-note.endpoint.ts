import { Note, NoteResponse, NoteUpdate } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { UpdateNoteDto } from '~note/dto/note.dto';

export const updateNoteEndpoint = (builder: ReduxQueryBuilder) =>
  builder.mutation<Note | null, UpdateNoteDto>({
    query: (note: NoteUpdate) => ({
      url: '/note',
      method: HttpMethod.put,
      body: note,
    }),
    transformResponse: ({ data: note }: FetchResponse<NoteResponse>) => {
      return note?.note || null;
    },
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
