'use client';

import {
  AddNoteHandlers,
  DeleteNoteHandler,
  MoveNotePosition,
  NewNoteToggle,
  Note,
  TreeNote,
  UnsafeCreateNoteDto,
} from '#interfaces/notes';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CreateNoteDto } from '~note/dto/note.dto';
import { UseDraggableState, useDraggableState } from '@components/notebook/hooks/useDraggableRow';
import { useAddNoteMutation, useMoveNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Editor, EditorViewMode } from '@interface/editor';
import { reset as resetEditor } from '@context/redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { getFocusedNote } from '@components/notebook/utils';

type MovedNoteResponse = { data: Note } | { error: FetchBaseQueryError | SerializedError };
export type MoveRowCallback = (
  note: Note | undefined,
  targetId: string | undefined,
  position: MoveNotePosition,
) => void;
/** Detects the creation of a new note and moves the user to the editor to edit that note */
export const useNotebook = (
  editor: Editor,
  noteList: TreeNote[] | undefined,
  setEditor: (editor: Partial<Editor>) => void,
  reset: () => void,
  userId?: string,
): [AddNoteHandlers, DeleteNoteHandler, UseDraggableState, MoveRowCallback] => {
  const [addNote] = useAddNoteMutation();
  const [moveNoteTrigger] = useMoveNoteMutation();

  /**
   * Mark a note for deletion, this will raise a modal which will prompt the user to confirm the deletion.
   */
  const [markedForDeletion, setMarkedForDeletion] = useState<TreeNote | undefined>(undefined);
  const stickyMarkedForDeletion = useRef<TreeNote | undefined>(undefined);
  /**
   * If a note has been marked for deletion and is not longer marked, then its deletion has been process.
   * Set the editor to the deleted note's parent or root
   */
  useEffect(() => {
    if (stickyMarkedForDeletion.current !== markedForDeletion) {
      const deletedNote = stickyMarkedForDeletion.current;

      if (!markedForDeletion && deletedNote) {
        if (deletedNote?.parentId) {
          const parent = noteList?.find((note: TreeNote) => note.id === deletedNote?.parentId);
          if (parent) {
            setEditor({
              id: parent.id,
              content: parent.content,
              title: parent.title,
              stale: false,
              viewMode: EditorViewMode.notebook,
            });
          } else {
            reset();
          }
        }
        reset();
      }
      stickyMarkedForDeletion.current = markedForDeletion;
    }
  });
  /**
   * Only one new-note input should display at a time. This state should hold the ID of the note who is
   * creating a child note or 'ROOT_LAST' | 'ROOT_FIRST' if the notebook is creating a new root note.
   */
  const [newNoteToggle, setNewNoteToggle] = useState<NewNoteToggle>(undefined);
  /** Denotes when we are expecting a newly created Note to be reported */
  const [noteAdded, setNoteAdded] = useState<boolean>(false);
  const stickyList = useRef<Note[] | undefined>();

  const dragHandlers = useDraggableState(userId, setNewNoteToggle);

  const moveNote = (note: Note | undefined, targetId: string | undefined | null, position: MoveNotePosition) => {
    if (!note || !targetId || !position || !userId) {
      throw Error(
        `CANNOT MOVE ROW, MISSING ARG: ${!note ? 'NOTE' : !targetId ? 'TARGET_ID' : position ? 'POSITION' : 'USER'}`,
      );
    }
    if (!noteList) {
      throw Error('Cannot move note without note list');
    }
    if (!targetId || targetId === 'ROOT_LAST' || targetId === 'ROOT_FIRST') {
      targetId = null;
    }
    const target = getFocusedNote(targetId, noteList).focused;

    moveNoteTrigger({
      id: note.id,
      position,
      targetId: targetId || undefined,
      userId,
    }).then((resp: MovedNoteResponse) => {
      // @ts-ignore
      if (resp.error) {
        // @ts-ignore
        throw Error('Error moving Note:' + resp.error?.message);
      }

      //Refocus the Notebook on a new note unless the note retained the same parent.
      if (position !== MoveNotePosition.aheadOf) {
        if (!target) {
          resetEditor();
        } else {
          setEditor({
            id: target.id,
            content: target.content,
            title: target.title,
            stale: false,
            viewMode: EditorViewMode.notebook,
          });
        }
      }
    });
  };
  /** Detect when a new note was both expected and added then move user to editor to edit new note. */
  useEffect(() => {
    handleNewNote({
      noteList,
      stickyList,
      noteAdded,
      setNoteAdded,
      setEditor,
    });
  }, [noteAdded, noteList, setEditor]);

  const addNoteCallback = (newNote: UnsafeCreateNoteDto) => {
    if (newNote?.userId) {
      setNoteAdded(true);
      addNote({ ...(newNote as CreateNoteDto), parentId: editor.id });
    }
    setNewNoteToggle(undefined);
  };

  const deleteNoteHandler: DeleteNoteHandler = {
    markedForDeletion,
    setMarkedForDeletion,
  };

  const addNoteToggle: AddNoteHandlers = {
    addNote: addNoteCallback,
    newNoteToggle,
    setNewNoteToggle,
  };
  return [addNoteToggle, deleteNoteHandler, dragHandlers, moveNote];
};

/**
 * Return Note not already counted in the stickyNote ref.
 * @param noteList : Note[] - List of notes queried by RTK Query
 * @param stickyNoteList : Note[] - List of notes recorded by what was queried by RTK Query
 *      This is used to detect when a new entry has been added.
 *      If that entry was expected (noteAdded state set to true;
 */
const getNewNote = (noteList: Note[], stickyNoteList: Note[] | undefined): Note | undefined => {
  return noteList?.find(({ id }: Note) => {
    const matchingStickyNote: Note | undefined = stickyNoteList?.find(({ id: stickyId }: Note) => id === stickyId);
    return !matchingStickyNote;
  });
};

type NoteList = Note[] | undefined;
interface HandleNewNoteArgs {
  noteList: NoteList;
  stickyList: MutableRefObject<NoteList>;
  noteAdded: boolean;
  setNoteAdded: Setter<boolean>;
  setEditor: (editor: Partial<Editor>) => void;
}

/**
 * Detect when noteList has been updated to include a new note which we were
 * expecting.
 * Update the stickyList ref when noteList has been updated.
 *
 * @param noteList - List of Notes belonging to the logged-in user.
 * @param stickyList - Copy of the above list for the purposes of detecting changes.
 * @param noteAdded - flag to indicate that we are expecting a new note to be added.
 * @param setNoteAdded
 * @param setEditor
 * @param setWindow
 */
const handleNewNote = ({ noteList, stickyList, noteAdded, setNoteAdded, setEditor }: HandleNewNoteArgs) => {
  if (noteList?.length !== stickyList.current?.length) {
    const stickyNotes = stickyList.current;
    if (noteAdded && noteList && stickyNotes) {
      const newNote: Note | undefined = getNewNote(noteList, stickyNotes);
      setNoteAdded(false);
      stickyList.current = noteList;
      if (newNote) {
        setEditor({
          title: newNote.title,
          content: '',
          id: newNote.id,
          stale: false,
          viewMode: EditorViewMode.editor,
        });
      }
    } else {
      stickyList.current = noteList;
    }
  } else {
    stickyList.current = noteList;
  }
};
