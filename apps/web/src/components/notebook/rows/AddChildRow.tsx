'use client';

import styles from '../notebook.module.scss';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { NoteTitleInput } from '../input';
import { NoteRowButton } from '../buttons';

interface NoteChildRowProps {
  onSubmit: (title: string) => void;
  setCreateToggle: (flag: boolean) => void;
  createToggle: boolean;
}

export const AddChildRow = ({ createToggle, onSubmit, setCreateToggle }: NoteChildRowProps) => {
  const [title, setTitle] = useState<string>('');

  return (
    <div className={`note-child-row ${styles.childRow} ${createToggle ? 'flex' : 'hidden'}`}>
      <NoteTitleInput
        toggle={createToggle}
        title={title}
        setTitle={setTitle}
        onBlur={() => !title && setCreateToggle(false)}
        onSubmit={() => onSubmit(title)}
      />
      <NoteRowButton
        name={'add-new-child-note'}
        onClick={() => {
          title && onSubmit(title);
          setCreateToggle(false);
        }}
      >
        <CheckIcon sx={{ width: '1rem' }} />
      </NoteRowButton>
      <div className={'mr-2'} />
    </div>
  );
};
