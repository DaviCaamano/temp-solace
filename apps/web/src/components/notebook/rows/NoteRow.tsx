import React, { PropsWithChildren } from 'react';
import { TreeNote } from '#interfaces/notes';

import { EditorViewMode } from '@interface/editor';
import { DragRowWrapper } from './DragRowWrapper';
import { NoteRowBody } from './NoteRowBody';
import { MoveRowCallback, useDraggable, UseDraggableState } from '@components/notebook/hooks';
import { RowCaret } from '@components/notebook/rows/RowCaret';
import { useEditor } from '@hooks/context';

interface NoteRowProps extends PropsWithChildren {
  dragHandlers: UseDraggableState;
  depth?: number;
  moveNote: MoveRowCallback;
  name: string;
  note: TreeNote;
}
export const NoteRow = ({ children, dragHandlers, moveNote, name, note }: NoteRowProps) => {
  const { setEditor } = useEditor();

  const sendNoteToPreview = () =>
    setEditor({
      id: note.id,
      content: note.content,
      title: note.title,
      stale: false,
      viewMode: EditorViewMode.notebook,
    });
  const dragState = useDraggable(dragHandlers, note, moveNote, sendNoteToPreview);
  const { ref, handlers, isDragged, y } = dragState;

  return (
    <div key={`note-row-${note.id}`} className={'note-row-container relative w-full'}>
      <DragRowWrapper
        containerName={`note-row-backdrop ${name}`}
        dragRef={ref}
        isDragged={isDragged}
        handlers={handlers.drag}
        yOffset={y}
      >
        <NoteRowBody dragState={dragState} containerName={name} title={note.title} />
        {children}
      </DragRowWrapper>
      <RowCaret note={note} rowDragged={dragState.state.rowDragged} />
    </div>
  );
};
