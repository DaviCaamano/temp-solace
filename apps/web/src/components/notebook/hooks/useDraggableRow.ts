'use client';

import { DragEvent, useEffect, useRef, useState } from 'react';
import { DraggedNotes, MoveNotePosition, NewNoteToggle, TreeNote, UseDraggableHandler } from '#interfaces/notes';
import { DraggableData, DraggableEventHandler } from 'react-draggable';
import { MoveRowCallback } from '@components/notebook/hooks/useNotebook';

export type UseDraggableState = [
  DraggedNotes,
  Setter<DraggedNotes>,
  userId: string | undefined,
  setNewNoteToggle: Setter<NewNoteToggle>,
];
/** Provides the shared state for dragged elements as well as an easy-to-pass argument for the useDraggable hook */
export const useDraggableState = (
  userId: string | undefined,
  setNewNoteToggle: Setter<NewNoteToggle>,
): UseDraggableState => {
  const [drag, setDrag] = useState<DraggedNotes>({
    /** The row being dragged */
    rowDragged: undefined,
    /** The row that the dragged row is currently hovering over */
    hoveredOver: undefined,
    /**
     * Determines Dropdown behavior
     *  MoveNotePosition.aheadOf - On Dropdown, move dragged row to position in front of the row dropped on.
     *  MoveNotePosition.childOf - On Dropdown, move dragged row to the position of first child of the row dropped on.
     *  MoveNotePosition.lastChild - On Dropdown, move dragged row to the last position of the root nodes
     *  MoveNotePosition.elevate - On Dropdown, move dragged row to the position after its parent.
     *      This removes the node as a child of its parent and makes it a child of its grandparent
     *        or null if the parent is a root node.
     */
    moveType: undefined,
    /** Dropdown target is invalid (is an ancestor of the row being dragged) */
    disabled: [],
  });

  return [drag, setDrag, userId, setNewNoteToggle];
};

const MINIMUM_DRAG_TIME = 50;
export type DragPosition = {
  /** start time of the click. Drag is only activated after MINIMUM_DRAG_TIME in milliseconds has passed. */
  start: number | undefined;
  /** Drag has been started if true. */
  active: boolean;
  /** Element's y position at the start of the drag. */
  y: number;
};

const initialPos: DragPosition = {
  start: undefined,
  active: false,
  y: 0,
};

//Height of element with class: 'note-row'
const NOTE_ROW_HEIGHT = 50;
//Used to shift a dragged element to have the cursor located at exactly the midpoint of the element.
const NOTE_ROW_HALF_HEIGHT = NOTE_ROW_HEIGHT / 2;
export const useDraggable = (
  [drag, setDrag, userId, setNewNoteToggle]: UseDraggableState,
  note: TreeNote,
  dropMove: MoveRowCallback,
  onClick?: () => void,
): UseDraggableHandler => {
  const { rowDragged, moveType, hoveredOver } = drag;

  const [{ start, active, y }, setPos] = useState<DragPosition>(initialPos);
  const setY = (newY: number) => setPos((prev: DragPosition) => ({ ...prev, y: newY }));
  /** the element that will be dragged */
  const element = useRef<HTMLDivElement>(null);
  const row = element.current;
  /**
   * sets Disabled Flag when a row is picked up and dragged
   */
  useEffect(() => {
    if (rowDragged) {
      const disabled: string[] = [];
      getAncestorsOfDragged(rowDragged, disabled);
      setDrag((prev: DraggedNotes) => ({
        ...prev,
        disabled,
      }));
    }
  }, [rowDragged, setDrag]);

  /**
   * on mouse down, start the clock to evaluate whether this is a click or a drag.
   *
   * It is a click if the onDragStop function runs before MINIMUM_DRAG_TIME has passed in milliseconds.
   */
  const onDragStart: DraggableEventHandler = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation(); //Stop Click, it will be triggered in onDragStop.
    // @ts-ignore
    let rect = event.target?.getBoundingClientRect();
    let offset = event.clientY - rect.top - NOTE_ROW_HALF_HEIGHT; //y position within the element.
    setPos((prev: DragPosition) => ({ ...prev, start: Date.now(), y: offset }));
  };

  /** Runs once-per-drag operations */
  const checkDrag = () => {
    if (!active && start && Date.now() - start > MINIMUM_DRAG_TIME) {
      setPos((prev: DragPosition) => ({ ...prev, active: true }));
      setDrag((prev: DraggedNotes) => ({
        ...prev,
        rowDragged: note,
      }));
      setNewNoteToggle(undefined);
    }
    return active && !!row;
  };

  /** Runs during drag on frame update (constantly) */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onDrag: DraggableEventHandler = (_, { deltaY }: DraggableData) => {
    const newPos = y + deltaY;
    setY(newPos);

    if (checkDrag()) {
      (row as HTMLDivElement).style.transform = `translateY(${newPos})`;
    }
  };

  /**
   * react-draggable's on drop event handlers.
   * Triggers when the user picks up a row and drops it.
   * if the user drags a row over another row's movement zones,
   *    this handler will make a request to the backend to move the dragged row.
   * */
  const onDragStop: DraggableEventHandler = () => {
    /** Mouse up happened before MINIMUM_DRAG_TIME and will be counted as a click instead of a drag */
    if (!active) {
      return onClick?.();
    }
    setPos(initialPos);
    if (!!row) {
      (row as HTMLDivElement).style.transform = '';
    }
    if (hoveredOver && moveType && userId) {
      /** Drag ended while on top of another row and on top of one of their movement zones. */
      dropMove(note, hoveredOver.id, moveType);
    }
    /** Reset state after move operation */
    setDrag((prev: DraggedNotes) => ({
      ...prev,
      rowDragged: undefined,
      hoveredOver: undefined,
      moveTo: undefined,
    }));
  };

  const onZoneEnter = (zoneMoveType: MoveNotePosition) => () => {
    if (drag) {
      setDrag((prev: DraggedNotes) => ({
        ...prev,
        moveType: zoneMoveType,
      }));
    }
  };

  /**
   * For the Row when not being dragged,
   *    If another row is being dragged and the cursor enters this row's space, report this row as hovered over
   */
  const onMouseEnter = () => {
    if (rowDragged) {
      setDrag((prev: DraggedNotes) => ({
        ...prev,
        hoveredOver: note,
      }));
    }
  };

  /**
   * For the Row when not being dragged,
   *    If another row is being dragged and the cursor enters this row's space, then leaves,
   *      report this row as no longer being hovered over
   */
  const onMouseLeave = () => {
    if (rowDragged) {
      if (drag.hoveredOver?.id === note.id) {
        setDrag((prev: DraggedNotes) => ({
          ...prev,
          hoveredOver: undefined,
          moveType: undefined,
        }));
      }
    }
  };

  const isDragged = note.id === drag.rowDragged?.id;
  const isHovered =
    note.id !== drag.rowDragged?.id && note.id === drag.hoveredOver?.id && note.depth === drag.hoveredOver.depth;
  const ancestorIsHovered = isHovered && !!drag.hoveredOver?.depth && note.depth > drag.hoveredOver.depth;
  return {
    handlers: {
      /** Handlers for the react-draggable-core element */
      drag: {
        onStart: onDragStart,
        onDrag,
        onStop: onDragStop,
      },
      /** Handlers for the row element */
      row: {
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
      },
      /** Handlers for the row's individual zones which are used to set the move type. */
      zone: (moveType: MoveNotePosition) => ({
        onMouseEnter: onZoneEnter(moveType),
      }),
    },
    state: drag,
    isDragged,
    isHovered,
    ancestorIsHovered,
    ref: element,
    y,
  };
};

const getAncestorsOfDragged = (node: TreeNote, list: string[]) => {
  list.push(node.id);
  node?.children?.forEach((note: TreeNote) => {
    getAncestorsOfDragged(note, list);
  });
};
