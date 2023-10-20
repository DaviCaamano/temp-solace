'use client';

import { DotsThreeOutlineVertical, TrashSimple } from 'phosphor-react';
import { colors } from '@styles/tailwind';
import styles from '@components/notebook/notebook.module.scss';
import { CSSProperties, LegacyRef, RefObject, useRef, useState } from 'react';
import { PopupMenu, PopUpMenuItem } from '@components/shared/menu';
import { DeleteNoteHandler, TreeNote } from '#interfaces/notes';

interface NoteSettingsButtonProps {
  deleteNoteHandler: DeleteNoteHandler;
  show: boolean;
  selectedNote: TreeNote | undefined;
}
export const NoteSettingsButton = ({
  deleteNoteHandler: { setMarkedForDeletion },
  selectedNote,
  show,
}: NoteSettingsButtonProps) => {
  const iconRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const logoutButton: PopUpMenuItem = {
    onClick: () => {
      if (selectedNote) {
        setMarkedForDeletion(selectedNote);
      }
    },
    component: (
      <div className={'flex flex-row relative'}>
        <div className={'absolute'} style={{ left: 0, top: '50%', transform: 'translateY(-50%)' }}>
          <TrashSimple size={32} color={colors.pink} weight='fill' className={'text-mug-light w-[2rem]'} />
        </div>
        <div className={'flex-1 justify-center'}>Delete</div>
      </div>
    ),
  };

  return (
    <div className={`note-settings-button ${styles.noteSettingsButton} ${show ? 'block' : 'hidden'}`}>
      <PopupMenu
        name={'note-settings-popup'}
        open={open}
        included={iconRef}
        setOpen={setOpen}
        items={logoutButton}
        wrapperStyle={wrapperStyle}
      />
      <div onClick={() => setOpen((prev: boolean) => !prev)} ref={iconRef as unknown as LegacyRef<HTMLDivElement>}>
        <DotsThreeOutlineVertical
          size={26}
          color={colors.mug}
          weight={'fill'}
          className={styles.noteSettingsButtonIcon}
        />
      </div>
    </div>
  );
};

const wrapperStyle: CSSProperties = {
  top: '2.5rem',
  right: '-0.4375rem',
};
