'use client';

import { useState } from 'react';
import { AddNoteButton } from '../buttons';
import { NoteTitleInput } from '@components/notebook/input/NoteTitleInput';
import { AddNoteHandlers } from '#interfaces/notes';

interface AddNoteRowProps {
  addNoteHandlers: AddNoteHandlers;
  hide: boolean;
  onClick: (title: string) => void;
}
export const AddNoteRow = ({
  addNoteHandlers: { newNoteToggle, setNewNoteToggle },
  hide,
  onClick,
}: AddNoteRowProps) => {
  const toggle = newNoteToggle === 'ROOT_LAST';
  const [title, setTitle] = useState<string>('');
  const addNote = () => {
    if (toggle && title) {
      onClick(title);
    } else {
      setNewNoteToggle('ROOT_LAST');
    }
    setTitle('');
  };

  const hideRow = (typeof newNoteToggle !== 'undefined' && newNoteToggle !== 'ROOT_LAST') || hide;
  return (
    <div
      className={`h-8 text-[1.875rem] text-latte pl-4 pr-2 leading-8 flex justify-start items-center  border-b border-latte py-6 ${
        hideRow && 'hidden'
      }`}
    >
      <NoteTitleInput
        toggle={toggle}
        title={title}
        setTitle={setTitle}
        onBlur={() => {
          setNewNoteToggle(undefined);
          setTitle('');
        }}
        onSubmit={() => {
          onClick(title);
          setTitle('');
        }}
      />
      <AddNoteButton onClick={addNote} />
    </div>
  );
};
