import { ListNotesResponse, Note, NoteStatus, TreeNote } from '#interfaces/notes';
import { HttpMethod } from '#interfaces/http';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { GetNoteDto, ListNotesDto } from '~note/dto/note.dto';
import { getNoteHierarchy } from '@context/redux/api/notes/utils';

export const listNotesEndpoint = (builder: ReduxQueryBuilder<'Note'>) =>
  builder.query<TreeNote[], ListNotesDto>({
    query: (params: GetNoteDto) => ({
      url: '/note/list',
      method: HttpMethod.get,
      params,
    }),
    transformResponse: (notes: ListNotesResponse): TreeNote[] => {
      const list: Note[] = notes?.notes?.filter((notes: Note) => notes.status === NoteStatus.active) || [];
      return getNoteHierarchy(list);
    },
    providesTags: [{ type: 'Note', id: 'LIST' }],
  });
