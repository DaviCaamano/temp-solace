import styles from './notebook.module.scss';
import { AddNoteRow, FocusRow, NoteList } from '@components/notebook/rows';
import { useEditor, useListNotes } from '@hooks/context';
import { getFocusedNote } from '@components/notebook/utils';
import { useMemo } from 'react';
import { useNotebook } from '@components/notebook/hooks';
import { LastChildZone } from '@components/notebook/move-row-zone';
import { DeleteNoteModal } from '@components/notebook/modal';
import { MoveNotePosition } from '#interfaces/notes';
import { NotebookHeader } from './header';

export const Notebook = () => {
  const { editor, reset, setEditor, user } = useEditor();
  const { isLoading, isError, error, data: noteList } = useListNotes(user);
  const [addNoteHandlers, deleteNoteHandler, dragEvents, moveNote] = useNotebook(
    editor,
    noteList,
    setEditor,
    reset,
    user?.id,
  );

  const addNoteOnClick = (title: string) => addNoteHandlers.addNote({ userId: user?.id, title });
  const noteHeiarchy = useMemo(() => noteList && getFocusedNote(editor.id, noteList), [editor.id, noteList]);

  if (!noteHeiarchy || isLoading) return <LoadingMessage />;
  if (isError) return <ErrorMessage error={error} />;
  return (
    <div id={'note-book'} className={styles.noteBook} style={{ height: `calc(100vh - ${heightReduction})` }}>
      <DeleteNoteModal deleteNoteHandler={deleteNoteHandler} userId={user?.id} />
      <AddNoteRow addNoteHandlers={addNoteHandlers} onClick={addNoteOnClick} hide={!!dragEvents[0].rowDragged} />
      <LastChildZone
        dragEvents={dragEvents}
        moveNote={moveNote}
        list={noteHeiarchy.list}
        position={MoveNotePosition.lastChildOf}
      />
      <NoteList dragHandlers={dragEvents} moveNote={moveNote} noteList={noteHeiarchy.list} />
      <FocusRow editor={editor} setEditor={setEditor} rowDragged={dragEvents[0].rowDragged} />
      <NotebookHeader
        deleteNoteHandler={deleteNoteHandler}
        dragEvents={dragEvents}
        selectedNote={noteHeiarchy.focused}
        setEditor={setEditor}
        moveNote={moveNote}
        noteList={noteList}
      />
    </div>
  );
};

const LoadingMessage = () => <div className={'text-3xl text-latte font-semibold'}>Loading...</div>;
const ErrorMessage = ({ error }: { error: any }) => (
  <div className={'text-3xl text-latte font-semibold'}>{error?.message}</div>
);

const headerHeight = 80;
const footerHeight = 256;
const wordCountHeight = 64;
const additionalMargin = 32;

const heightReduction = (headerHeight + footerHeight + wordCountHeight + additionalMargin) / 16 + 'rem';
