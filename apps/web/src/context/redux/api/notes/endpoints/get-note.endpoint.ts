import { ReduxQueryBuilder } from '#interfaces/redux';
import { Note, NoteResponse } from '#interfaces/notes';
import { GetNoteDto } from '~note/dto/note.dto';
import { HttpMethod } from '#interfaces/http';

export const getNotesEndpoint = (builder: ReduxQueryBuilder<'Note'>) =>
  builder.query<Note | null, GetNoteDto>({
    query: (params: GetNoteDto) => ({
      url: '/note',
      method: HttpMethod.get,
      params,
    }),
    transformResponse: ({ data: note }: FetchResponse<NoteResponse>) => {
      return note?.note || null;
    },
    providesTags: [{ type: 'Note', id: 'LIST' }],
  });
