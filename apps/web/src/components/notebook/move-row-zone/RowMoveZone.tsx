import { MoveNotePosition } from '#interfaces/notes';
import { colors } from '@styles/tailwind';
import { CSSProperties, PropsWithChildren } from 'react';

export interface MoveZoneProps extends PropsWithChildren {
  isHovered: boolean;
  expand: boolean;
  mouseHandlers: { onMouseEnter: () => void };
  position: MoveNotePosition;
}

/**
 * When the user taps and drags a row, they can move that row over another row to reposition the row.
 * A row can be positioned either:
 *    1) In front of another row
 *    2) As a child of another row
 *    3) As the last of all rows (This option is handled elsewhere, not in this component)
 *
 *    When the user drags a row and hovers their mouse over another row, they may drop the row on top of these
 *    "RowMoveZone" components to trigger a request which changes the position of the dragged note.
 *
 *    This component will locate itself on the top half or bottom half of a row if the user drags another row on top
 *    of it.
 *    This component will locate itself on the top half if position is set to: MoveNotePosition.aheadOf
 *    This component will locate itself on the bottom half if position is set to: MoveNotePosition.childOf
 *
 * @param isHovered - Whether this row is being hovered while another row is being dragged.
 * @param expand - boolean: Whether this zone should show itself or not.
 * @param mouseHandlers - onMouseEnter and onMouseLeave mouse events to set the DraggedNotes state
 * @param position - used to both set the position of this zone inside the row and the move request if the user
 *   drops a row on top of this zone.
 */
export const RowMoveZone = ({ children, expand, isHovered, mouseHandlers, position }: MoveZoneProps) => {
  return (
    <div
      className={
        'move-zone absolute transition-all w-full overflow-hidden px-[0.625rem] flex justify-center items-center'
      }
      {...mouseHandlers}
      style={MoveZonePosition(expand, isHovered, position)}
    >
      {children}
    </div>
  );
};

const topBgColor = (hovered: boolean) => (hovered ? colors['mug-gray-off-light'] : colors['mug-gray-off']);
const bottomBgColor = (hovered: boolean) => (hovered ? colors['mug-gray-light'] : colors['mug-gray']);
const lastBgColor = (hovered: boolean) => (hovered ? colors['mug-gray-off-dark'] : colors['mug-gray-dark']);
/** CSS styles for Zone */
const MoveZonePosition = (expand: boolean, hovered: boolean, position: MoveNotePosition) => {
  switch (position) {
    case MoveNotePosition.aheadOf:
      return {
        top: '0',
        height: expand ? '1.5625rem' : 0,
        backgroundColor: topBgColor(hovered),
      };
    case MoveNotePosition.childOf:
      return {
        bottom: '0',
        height: expand ? '1.5625rem' : 0,
        backgroundColor: bottomBgColor(hovered),
      };
    case MoveNotePosition.lastChildOf:
      const style: CSSProperties = {
        backgroundColor: lastBgColor(hovered),
      };
      if (expand) {
        style.flex = 1;
        style.minHeight = '3.6rem';
      }
      return style;
  }
};
