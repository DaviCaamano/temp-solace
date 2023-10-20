import { RowMoveZone } from '@components/notebook/move-row-zone/RowMoveZone';
import { MoveNotePosition, TreeNote } from '#interfaces/notes';
import { MoveRowCallback, useDraggable, UseDraggableState } from '@components/notebook/hooks';
import SouthIcon from '@mui/icons-material/South';
import styles from '@components/notebook/notebook.module.scss';

interface EndOfTreeMoveZoneProps {
  dragEvents: UseDraggableState;
  list: TreeNote[];
  moveNote: MoveRowCallback;
  position: MoveNotePosition;
}
export const LastChildZone = ({ dragEvents, list, moveNote, position }: EndOfTreeMoveZoneProps) => {
  const { state: draggedState, handlers, isHovered } = useDraggable(dragEvents, rootNote, moveNote);

  if (lastNoteBeingDragged(draggedState.rowDragged, list)) {
    return null;
  }
  return (
    <div id={'last-child-move-zone'} {...handlers.row}>
      <RowMoveZone
        isHovered={isHovered}
        expand={!!draggedState.rowDragged}
        mouseHandlers={handlers.zone(MoveNotePosition.lastChildOf)}
        position={position}
      >
        <SouthIcon className={`${styles.headerDragIcon}`} style={{ fontSize: '2rem', lineHeight: '100%' }} />
      </RowMoveZone>
    </div>
  );
};

const rootNote: TreeNote = { id: 'ROOT_LAST' } as TreeNote;

const lastNoteBeingDragged = (note: TreeNote | undefined, list: TreeNote[]) => {
  const lastNote = list[list.length - 1];
  return !lastNote?.id || !note?.id || lastNote.id === note.id;
};
