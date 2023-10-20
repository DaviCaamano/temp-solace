'use client';

import SaveIcon from '@mui/icons-material/Save';
import { useEditor } from '@hooks/context';
import { useUpdateNoteMutation } from '@context/redux/api/notes/notes.slice';
import { Tooltip } from '@components/shared';
import { CSSProperties, useCallback } from 'react';
import { useSaveKeybinding } from '../../menu/buttons/hooks';
import styles from '../../menu/buttons/editor-buttons.module.scss';
import { useRouter } from 'next/router';
import { LocalStorage } from '@interface/cookie';
import add from 'date-fns/add';

export const SaveButton = () => {
  const { editor, user, setEditor } = useEditor();
  const [save] = useUpdateNoteMutation();
  const stale = editor.stale;
  const router = useRouter();

  /**
   * If user is not logged in, save the content of the editor to local storage.
   * This content will be used to create a new note for the user upon login with "Untitled" as the title.
   */
  const onClick = useCallback(() => {
    if (!user?.id) {
      localStorage.setItem(LocalStorage.editorContent, editor.content);
      localStorage.setItem(LocalStorage.expiration, add(new Date(), { days: 7 }).toString());
      router.push('/api/auth/login').then();
    } else if (editor.id) {
      save({
        id: editor.id,
        title: editor.title,
        content: editor.content,
        userId: user.id,
      })
        .then(() => setEditor({ stale: false }))
        .catch(() => setEditor({ stale: true }));
    }
  }, [editor.content, editor.id, editor.title, router, save, setEditor, user]);

  const disabled = !user?.id;

  useSaveKeybinding(onClick, !user?.id);
  return (
    <Tooltip
      name={'save-button-tooltip'}
      content={<ToolTipContent loggedIn={!!user?.id} stale={stale} />}
      {...tooltipStyle}
    >
      <SaveIcon
        className={`${styles.saveButton} ${disabled && styles.disabled} ${stale && styles.stale}`}
        onClick={onClick}
        style={{ fontSize: '2rem' }}
      />
    </Tooltip>
  );
};

const ToolTipContent = ({ loggedIn, stale }: { loggedIn: boolean; stale: boolean | undefined }) =>
  !stale ? (
    'Saved!'
  ) : loggedIn ? (
    'Ctrl-S'
  ) : (
    <span>
      Please <span className={'underline'}>Login</span> to Save your note.
    </span>
  );

const tooltipStyle = {
  tooltip: { style: { maxWidth: '150px' } },
  wrapper: {
    className: 'w-8 h-8',
    style: {
      position: 'absolute',
      right: '3rem',
      top: '10px',
    } as CSSProperties,
  },
};
