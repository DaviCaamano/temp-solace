import { PropsWithChildren } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import styles from '../notebook.module.scss';
interface AddNoteButtonProps {
  disabled?: boolean;
  onClick: () => any;
}
export const AddNoteButton = ({ disabled, onClick }: AddNoteButtonProps) => (
  <NoteRowButton disabled={disabled} onClick={onClick} name={'add-note-button'}>
    +
  </NoteRowButton>
);
export const RemoveNoteButton = ({ disabled, onClick }: AddNoteButtonProps) => (
  <NoteRowButton disabled={disabled} onClick={onClick} name={'remove-note-button'}>
    <span className={'relative top-[-1px]'}>
      <ClearIcon style={{ fontSize: '16px' }} />
    </span>
  </NoteRowButton>
);

interface NoteRowButtonProps extends PropsWithChildren {
  disabled?: boolean;
  name: string;
  onClick: () => any;
}

export const NoteRowButton = ({ children, disabled, name, onClick }: NoteRowButtonProps) => (
  <button
    data-testid={name}
    className={`note-row-button ${name} ${styles.noteRowButton} ${
      disabled ? 'bg-mug-disabled cursor-not-allowed' : 'bg-mug-light cursor-pointer'
    }`}
    onClick={onClick}
    disabled={disabled}
    onMouseDown={(event) => event.stopPropagation()}
  >
    {children}
  </button>
);
