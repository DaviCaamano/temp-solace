import { MoveNotePosition, UseDraggableHandler } from '#interfaces/notes';
import styles from '@components/notebook/notebook.module.scss';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { capitalize } from '#utils/string';
import { RowZoneIcon } from './RowZoneIcon';
import { CSSProperties } from 'react';

interface NoteRowTitleProps {
  dragState: UseDraggableHandler;
  containerName: string;
  title: string | undefined;
}
export const NoteRowTitle = ({ dragState, containerName, title }: NoteRowTitleProps) => {
  const {
    state: { hoveredOver, rowDragged },
  } = dragState;
  return (
    <div
      className={`row-body relative w-full flex flex-row ${hoveredOver && 'pointer-events-none'} `}
      style={{ height: '2rem' }}
    >
      <DragIcon hide={!!rowDragged || !!hoveredOver} containerName={containerName} />
      <div
        className={'row-body-framer absolute flex flex-row transition-all flex-1 left-[2rem]'}
        style={{ width: 'calc(100% - 2rem)' }}
      >
        <div
          className={
            'relative note-title w-full h-full flex flex-row justify-start items-center whitespace-nowrap ' +
            'overflow-ellipsis cursor-pointer text-latte transition-all '
          }
          style={{ height: '2rem' }}
        >
          <Title dragState={dragState} title={title} />
          <PositionPreview dragState={dragState} />
          <div className={'flex-1'} />
        </div>
      </div>
    </div>
  );
};

interface DragIconProps {
  hide: boolean;
  containerName: string;
}
const DragIcon = ({ hide, containerName }: DragIconProps) => {
  const dragButton = `${containerName}-drag-button ${hide && styles.hideDragButton} ${styles.dragIndicator}`;

  return <DragIndicatorIcon className={dragButton} style={{ fontSize: '2rem' }} />;
};

interface TitleProps {
  dragState: UseDraggableHandler;
  title: string | undefined;
}
const Title = ({
  dragState: {
    state: { moveType, hoveredOver },
    isDragged,
    isHovered,
  },
  title,
}: TitleProps) => {
  if (isDragged && hoveredOver) {
    /**
     * While being dragged over another row, hide the title to let the PositionPreview Component indicate where the
     * note will be moved to.
     */
    return null;
  }
  let shift: CSSProperties | undefined;
  if (isHovered) {
    if (moveType === MoveNotePosition.aheadOf) {
      shift = { transform: 'translateY(40%)' };
    } else if (moveType === MoveNotePosition.childOf) {
      shift = { transform: 'translateY(-35%)' };
    }
  }
  return (
    <div
      className={
        'row-title-text relative text-[1rem] sm:text-[1.5rem] md:text-[1.5rem] transition-all overflow-ellipsis'
      }
      style={{
        ...shift,
        width: 'calc(100% - 2rem)',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {capitalize(title || 'Untitled')}
    </div>
  );
};

/**
 * A transparent phantom title that indicates where a dragged row will be relocated to.
 */
interface PositionPreviewProps {
  dragState: UseDraggableHandler;
}
const PositionPreview = ({
  dragState: {
    state: { moveType, rowDragged },
    isHovered,
  },
}: PositionPreviewProps) => {
  if (!isHovered || !rowDragged) {
    return null;
  }
  let shift: CSSProperties | undefined;
  if (moveType === MoveNotePosition.aheadOf) {
    shift = { left: 0, top: '50%', transform: 'translate(-1.75rem, -85%)' };
  } else if (moveType === MoveNotePosition.childOf) {
    shift = { left: 0, top: '50%', transform: 'translate(-3px, 0%)' };
  }
  return (
    <div className={'row-title-text absolute text-[1.75rem] transition-all flex flex-row opacity-50'} style={shift}>
      <RowZoneIcon moveType={moveType} />
      {capitalize(rowDragged.title || 'Untitled')}
    </div>
  );
};
