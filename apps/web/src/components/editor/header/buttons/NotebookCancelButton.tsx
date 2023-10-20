'use client';

import { useEditor } from '@hooks/context';
import { Tooltip } from '@components/shared';
import { CSSProperties, useCallback } from 'react';
import { colors } from '@styles/tailwind';
import { LocalStorage } from '@interface/cookie';
import add from 'date-fns/add';
import { useRouter } from 'next/router';
import { EditorViewMode } from '@interface/editor';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

export const NotebookCancelButton = () => {
  const router = useRouter();
  const { editor, reset, setEditor, user } = useEditor();

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
      reset();
      setEditor({ viewMode: EditorViewMode.notebook });
    }
  }, [editor.content, editor.id, reset, router, setEditor, user?.id]);

  return (
    <Tooltip
      name={'notebook-cancel-button-tooltip'}
      content={<ToolTipContent loggedIn={!!user?.id} />}
      {...tooltipStyle}
    >
      <div className={'notebook-cancel-button rounded-3xl overflow-hidden'} onClick={onClick}>
        <DisabledByDefaultIcon style={{ zIndex: 1, color: colors.mug, fontSize: '32px' }} />
      </div>
    </Tooltip>
  );
};

const ToolTipContent = ({ loggedIn }: { loggedIn: boolean }) =>
  loggedIn ? (
    'Cancel Edit'
  ) : (
    <span>
      Please <span className={'underline'}>Login</span> to view your notebook.
    </span>
  );

const tooltipStyle = {
  tooltip: { style: { maxWidth: '150px' } },
  wrapper: {
    className: 'w-12 h-12',
    style: {
      position: 'absolute',
      right: '0.5rem',
      top: '10px',
    } as CSSProperties,
  },
};
