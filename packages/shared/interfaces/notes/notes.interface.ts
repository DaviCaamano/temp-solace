import { CreateNoteDto } from '~note/dto/note.dto';
import { RefObject } from 'react';
import { DraggableEventHandler } from 'react-draggable';

export interface Note {
  id: string;
  title: string;
  content: string;
  parentId?: string;
  next?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: NoteStatus;
}

export enum NoteStatus {
  active = 'ACTIVE',
  deleted = 'DELETED',
}

/**
 * Determines Dropdown behavior
 *  MoveNotePosition.aheadOf - On Dropdown, move dragged row to position in front of the row dropped on.
 *  MoveNotePosition.childOf - On Dropdown, move dragged row to the position of first child of the row dropped on.
 *  MoveNotePosition.lastChild - On Dropdown, move dragged row to the last position of the root nodes
 *  MoveNotePosition.elevate - On Dropdown, move dragged row to the position after it's parent.
 *      This removes the node as a child of its parent and makes it a child of its grandparent
 *        or null if the parent is a root node.
 */
export enum MoveNotePosition {
  childOf = 'childOf',
  aheadOf = 'aheadOf',
  lastChildOf = 'lastChildOf',
  elevate = 'elevate',
}

type NoteWithoutTimeSTamps = Omit<Note, 'createdAt' | 'updatedAt'>;
export type NoteUpdate = Partial<NoteWithoutTimeSTamps> & Pick<Note, 'id'>;

export interface NoteResponse {
  note: Note;
}

export interface TreeNote extends Note {
  depth: number;
  prev?: string;
  children?: TreeNote[]; //Not provided by Backend
}

export interface ListNotesResponse {
  notes: TreeNote[];
}

export interface SuccessNoteResponse {
  success: boolean;
}

export interface DeleteNoteResponse {
  deleted: string[];
}

export interface UnsafeCreateNoteDto extends Omit<CreateNoteDto, 'userId'> {
  userId?: string;
}

export type UnsafeAddNoteTrigger = (newNote: UnsafeCreateNoteDto) => void;

export interface DetachedNote {
  sibling: Note | undefined;
  noteId: string;
  originalParent: string;
  originalNext: string;
  userId: string;
}
/** Component Interfaces */

export interface DeleteNoteHandler {
  markedForDeletion: TreeNote | undefined;
  setMarkedForDeletion: Setter<TreeNote | undefined>;
}

export interface DraggedNotes {
  rowDragged: TreeNote | undefined;
  hoveredOver: TreeNote | undefined;
  moveType: MoveNotePosition | undefined;
  disabled: string[];
}

export type NewNoteToggle = string | 'ROOT_LAST' | 'ROOT_FIST' | undefined;
export interface AddNoteHandlers {
  addNote: UnsafeAddNoteTrigger;
  newNoteToggle: NewNoteToggle;
  setNewNoteToggle: Setter<NewNoteToggle>;
}

/** Drag Row Interfaces */

export interface UseDraggableHandler {
  handlers: DragHandlers;
  state: DraggedNotes;
  isDragged: boolean;
  isHovered: boolean;
  ancestorIsHovered: boolean;
  ref: RefObject<HTMLDivElement>;
  y: number;
}
export interface DragHandlers {
  zone: DragZoneHandler;
  row: DragRowHandlers;
  drag: DragWrapperHandlers;
}
export type DragZoneHandler = (moveType: MoveNotePosition) => { onMouseEnter: () => void };
export interface DragRowHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
export interface DragWrapperHandlers {
  onStart: DraggableEventHandler;
  onDrag: DraggableEventHandler;
  onStop: DraggableEventHandler;
}
