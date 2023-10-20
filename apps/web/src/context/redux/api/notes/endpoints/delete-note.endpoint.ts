import { DeleteNoteResponse } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { DeleteNoteDto } from '~note/dto/note.dto';

export const deleteNoteEndpoint = (builder: ReduxQueryBuilder) =>
  builder.mutation<string[], DeleteNoteDto>({
    query: (body: DeleteNoteDto) => ({
      url: '/note',
      method: HttpMethod.delete,
      body,
    }),
    transformResponse: (resp: DeleteNoteResponse) => {
      return resp?.deleted;
    },
    invalidatesTags: [{ type: 'Note', id: 'LIST' }],
  });
