import { MoveNotePosition, UseDraggableHandler } from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.scss';
import { RowMoveZone } from '@components/notebook/move-row-zone/RowMoveZone';
import { NoteRowTitle } from './NoteRowTitle';

interface RowProps {
  dragState: UseDraggableHandler;
  containerName: string;
  title: string;
}
export const NoteRowBody = ({ dragState, containerName, title }: RowProps) => {
  const {
    handlers: { zone: zoneHandlers, row: rowHandlers },
    isDragged,
    isHovered,
  } = dragState;
  return (
    <div
      id={'note-row-body-animator'}
      className={`w-full h-full flex justify-center border-b ${isDragged && 'border-t'} border-latte `}
      {...rowHandlers}
    >
      <div className={`note-row-body ${styles.noteRowParent}`}>
        <RowMoveZone
          isHovered={isHovered}
          expand={isHovered}
          mouseHandlers={zoneHandlers(MoveNotePosition.aheadOf)}
          position={MoveNotePosition.aheadOf}
        />
        <RowMoveZone
          isHovered={isHovered}
          expand={isHovered}
          mouseHandlers={zoneHandlers(MoveNotePosition.childOf)}
          position={MoveNotePosition.childOf}
        />

        <NoteRowTitle dragState={dragState} containerName={containerName} title={title} />
      </div>
    </div>
  );
};
