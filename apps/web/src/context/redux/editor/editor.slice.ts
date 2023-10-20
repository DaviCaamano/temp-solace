import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Editor, EditorViewMode } from '@interface/editor/editor';

const initialState: Editor = {
  content: '',
  title: '',
  stale: true,
  viewMode: EditorViewMode.notebook,
};

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditor: (state: Editor, action: PayloadAction<Partial<Editor>>) => {
      const newState = action.payload;
      if (newState.hasOwnProperty('id')) {
        state.id = newState.id;
      }
      if (newState.hasOwnProperty('content')) {
        state.content = newState.content || '';
      }
      if (newState.hasOwnProperty('title')) {
        state.title = newState.title || '';
      }
      if (newState.hasOwnProperty('stale')) {
        state.stale = newState.stale;
      }
      if (newState.hasOwnProperty('viewMode') && newState.viewMode) {
        state.viewMode = newState.viewMode;
      }
    },
    setContent: (state: Editor, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    reset: (state: Editor) => {
      state.id = undefined;
      state.content = '';
      state.title = '';
      state.stale = false;
    },
    setTitle: (state: Editor, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setViewMode: (state: Editor, action: PayloadAction<EditorViewMode>) => {
      state.viewMode = action.payload;
    },
  },
});

export const { reset, setEditor, setContent, setTitle, setViewMode } = editorSlice.actions;

export default editorSlice.reducer;
