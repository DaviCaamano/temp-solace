'use client';

import { Modal } from '@components/shared';
import { useDeleteNoteMutation } from '@context/redux/api/notes/notes.slice';
import { DeleteNoteHandler } from '#interfaces/notes';
import { useState } from 'react';
import { TrashSimple } from 'phosphor-react';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '@styles/tailwind';

interface DeleteNoteModalProps {
  deleteNoteHandler: DeleteNoteHandler;
  userId: string | undefined;
}
export const DeleteNoteModal = ({
  deleteNoteHandler: { markedForDeletion, setMarkedForDeletion },
  userId,
}: DeleteNoteModalProps) => {
  const [deleteChildren, setDeleteChildren] = useState<boolean>(false);
  const [deleteNote] = useDeleteNoteMutation();

  if (!userId || !markedForDeletion) {
    return null;
  }

  const onClick = async () => {
    await deleteNote({ id: markedForDeletion.id, userId, deleteChildren });
    setMarkedForDeletion(undefined);
  };

  return (
    <Modal open={!!markedForDeletion} close={() => setMarkedForDeletion(undefined)}>
      <div
        id={'note-book-delete-modal'}
        className={'relative w-full md:w-[43.75rem] flex flex-col mb-[-0.25rem] pt-4  justify-center items-center'}
        style={{ maxWidth: 'calc(100vw - 1.25rem)' }}
      >
        <div className={'flex justify-center absolute w-full pointer-events-none my-4'} style={{ top: '-15px' }}>
          <TrashSimple size={32} color={colors.mug} weight='fill' className={'text-mug-light w-[2rem]'} />
        </div>
        <div id={'delete-modal-description'} className={'mt-4 mb-4 md:mb-2'}>
          Are you sure you want <br className={'md:hidden'} />
          to delete this note?
        </div>
        <div
          id={'delete-modal-title'}
          className={'mb-4 md:mb-2 relative overflow-ellipsis max-w-full'}
          style={{ textOverflow: 'ellipsis' }}
        >
          <FormatQuoteIcon
            style={{ transform: 'scaleX(-1)', fontSize: '16px' }}
            className={'relative inline bottom-2'}
          />
          <span className={'font-semibold inline-block overflow-auto'} style={{ maxWidth: 'calc(100% - 2rem)' }}>
            {markedForDeletion.title}
          </span>
          <FormatQuoteIcon style={{ fontSize: '16px' }} className={'relative inline bottom-2'} />
        </div>
        <div
          id={'delete-modal-button-container'}
          className={'flex flex-col md:flex-row w-full justify-between px-2 xs:px-4 sm:px-12 mt-2'}
        >
          <DeleteChildrenCheckbox checked={deleteChildren} setChecked={setDeleteChildren} />
          <div className={'h-8 w-[184px] mx-auto md:m-0'}>
            <button
              id={'delete-modal-confirm-button'}
              data-testid={'delete-modal-confirm-button'}
              className={'py-[1px] h-full text-[12px] rounded-2xl text-latte w-[5rem] bg-mug-light'}
              onClick={onClick}
            >
              <CheckIcon />
            </button>
            <button
              id={'delete-modal-cancel-button'}
              className={'py-[1px] h-full text-[12px] rounded-2xl bg-mug-light text-latte ml-6 w-[5rem]'}
              onClick={() => setMarkedForDeletion(undefined)}
            >
              <CloseIcon />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

interface DeleteChildrenCheckboxProps {
  checked: boolean;
  setChecked: Setter<boolean>;
}
const DeleteChildrenCheckbox = ({ checked, setChecked }: DeleteChildrenCheckboxProps) => {
  const onClick = () => setChecked((prev: boolean) => !prev);
  return (
    <div
      className={
        'delete-children-prompt text-[0.9rem] xs:text-[1rem] h-6 mb-5 md:mb-3 mt-1 flex justify-center items-center cursor-pointer select-none text-end'
      }
      onClick={onClick}
    >
      Delete attached notes:
      <Checkbox className={'ml-2'} checked={checked} />
    </div>
  );
};

interface CheckboxProps {
  checked: boolean;
  className?: string;
}
const Checkbox = ({ checked, className }: CheckboxProps) => (
  <div className={`${className} inline-flex h-5 w-5 overflow-hidden select-none`}>
    <div className={'h-5 w-5 border-mug-light border-[2px] rounded p-[2px] flex justify-center items-center'}>
      {checked && <div className={'bg-mug-light w-full h-full mx-auto'} />}
    </div>
  </div>
);
