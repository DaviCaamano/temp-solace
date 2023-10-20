import { NoteRow } from '@components/notebook/rows/NoteRow';
import { TreeNote } from '#interfaces/notes';
import { MoveRowCallback, UseDraggableState } from '@components/notebook/hooks';
interface NoteListProps {
  depth?: number;
  dragHandlers: UseDraggableState;
  moveNote: MoveRowCallback;
  noteList?: TreeNote[] | undefined;
}

export const NoteList = ({ depth = 0, dragHandlers, moveNote, noteList }: NoteListProps) => {
  if (!noteList?.length) {
    return null;
  }

  return (
    <div className={'note-list flex flex-col'}>
      {noteList?.map((note, index) => {
        return (
          <NoteRow
            key={note.id}
            name={'note-row-' + index}
            moveNote={moveNote}
            note={note}
            depth={depth}
            dragHandlers={dragHandlers}
          />
        );
      })}
    </div>
  );
};
