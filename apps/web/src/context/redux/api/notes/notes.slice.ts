import { apiSlice } from '@context/redux/api/api.slice';

//endpoints
import {
  addNoteEndpoint,
  deleteNoteEndpoint,
  getNotesEndpoint,
  listNotesEndpoint,
  moveNoteEndpoint,
  updateNoteEndpoint,
} from '@context/redux/api/notes/endpoints';
import { ReduxQueryBuilder } from '#interfaces/redux/redux.interfaces';

export const notesSlice = apiSlice.injectEndpoints({
  endpoints: (builder: ReduxQueryBuilder<'Note'>) => ({
    getNote: getNotesEndpoint(builder),
    listNotes: listNotesEndpoint(builder),
    addNote: addNoteEndpoint(builder),
    updateNote: updateNoteEndpoint(builder),
    deleteNote: deleteNoteEndpoint(builder),
    moveNote: moveNoteEndpoint(builder),
  }),
  overrideExisting: false,
});

export const {
  useListNotesQuery,
  useLazyListNotesQuery,
  useGetNoteQuery,
  useLazyGetNoteQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useMoveNoteMutation,
} = notesSlice;
