import styles from '@components/notebook/notebook.module.scss';
import WestIcon from '@mui/icons-material/West';
import { DeleteNoteHandler, MoveNotePosition, TreeNote } from '#interfaces/notes';

import { Editor } from '@interface/editor';
import React from 'react';
import { HeaderBackButton } from './HeaderBackButton';
import { NoteSettingsButton } from './NoteSettingsButton';
import { useDraggable, UseDraggableState } from '../hooks/useDraggableRow';
import { MoveRowCallback } from '@components/notebook/hooks';
const rootNote: TreeNote = { id: 'ROOT_FIRST' } as TreeNote;

interface NotebookHeader {
  deleteNoteHandler: DeleteNoteHandler;
  dragEvents: UseDraggableState;
  selectedNote: TreeNote | undefined;
  moveNote: MoveRowCallback;
  noteList: TreeNote[] | undefined;
  setEditor: (editor: Partial<Editor>) => void;
}

export const NotebookHeader = ({
  deleteNoteHandler,
  dragEvents,
  selectedNote,
  moveNote,
  noteList,
  setEditor,
}: NotebookHeader) => {
  const {
    state: { rowDragged },
    handlers,
    isHovered,
  } = useDraggable(dragEvents, selectedNote || rootNote, moveNote);
  const rowBeingDragged = !!rowDragged;

  const showBackButton = !rowBeingDragged && !!selectedNote && !!noteList;

  const dragHandlers = {
    onMouseLeave: () => rowDragged?.parentId && handlers.row.onMouseLeave(),
    onMouseEnter: () => {
      if (rowDragged?.parentId) {
        handlers.row.onMouseEnter();
        handlers.zone(MoveNotePosition.elevate).onMouseEnter();
      }
    },
  };
  return (
    <div id={'notebook-header'} className={styles.header} {...dragHandlers}>
      <HeaderBackButton noteList={noteList} show={showBackButton} selectedNote={selectedNote} setEditor={setEditor} />
      <NoteSettingsButton show={showBackButton} selectedNote={selectedNote} deleteNoteHandler={deleteNoteHandler} />
      <Highlight isHovered={isHovered} rowDragged={rowBeingDragged} />
      <DragIndicator rowDragged={rowDragged} />
    </div>
  );
};

interface DragIndicatorProps {
  rowDragged: TreeNote | undefined;
}
const DragIndicator = ({ rowDragged }: DragIndicatorProps) => {
  if (!rowDragged?.parentId) {
    return null;
  }
  return <WestIcon className={`${styles.headerDragIcon}`} style={{ fontSize: '2.5rem', lineHeight: '100%' }} />;
};

interface HighLightProps {
  isHovered: boolean;
  rowDragged: boolean;
}
const Highlight = ({ isHovered, rowDragged }: HighLightProps) => (
  <div
    id={'notebook-header-drag-highlight'}
    className={`${rowDragged ? 'block' : 'hidden'} absolute w-full h-full top-0 left-0 bg-white ${
      isHovered ? 'opacity-50' : 'opacity-20'
    } cursor-pointer pointer-events-none`}
  />
);
