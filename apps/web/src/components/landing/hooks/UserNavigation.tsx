'use client';

import { useLogin } from '@hooks/user';
import { useEffect, useRef } from 'react';
import { LocalStorage } from '@interface/cookie';
import { useAddNoteMutation } from '@context/redux/api/notes/notes.slice';
import { useEditor } from '@hooks/context';
import { Note } from '#interfaces/notes';
import { EditorViewMode } from '@interface/editor';
import { usePromos } from '@components/landing/hooks/usePromos';
import { Promo } from '#interfaces/promo';

export interface UseUserNavigation {
  closePromo: (promo: Promo) => void;
  promos: Promo[];
  viewMode: EditorViewMode;
}
/** Handle Navigation Logic for Landing Page */
export const useLoginNavigation = (): UseUserNavigation => {
  const [addNote] = useAddNoteMutation();
  const { setEditor, editor } = useEditor();
  const { isLoading, isLoggedOut, user } = useLogin(true);
  const { promos, closePromo } = usePromos({
    isLoggedIn: isLoading ? undefined : !isLoggedOut,
  });
  const stickyLoggedStatus = useRef<boolean | undefined>(undefined);

  /** When the user goes from logged in to logged out, or vise versa, direct them to the appropriate content window. */
  useEffect(() => {
    if (!isLoading && stickyLoggedStatus.current !== isLoggedOut) {
      stickyLoggedStatus.current = isLoggedOut;
      if (isLoggedOut && editor.viewMode !== EditorViewMode.editor) {
        setEditor({ viewMode: EditorViewMode.editor });
      } else {
        /** Editor Content we store in Local Storage for logged-out users to resume editing upon logging in. */
        const locallyStoredContent = localStorage.getItem(LocalStorage.editorContent);

        /**
         * If content was stored in local storage && user has logged in:
         * Retrieve that content
         * Clear Local Storage
         * Create a new note with the title "Untitled"
         * Load the editor with this new Note.
         *
         */
        if (locallyStoredContent && user?.id) {
          addNote({
            title: '',
            userId: user?.id,
            content: locallyStoredContent,
          }).then(
            // @ts-ignore
            ({ data: newNote }: FetchResponse<Note | null>) => {
              if (newNote) {
                localStorage.clear();
                setEditor({
                  id: newNote.id,
                  title: newNote.title,
                  content: newNote.content,
                  stale: false,
                });
                setEditor({ viewMode: EditorViewMode.editor });
              } else {
                setEditor({ viewMode: EditorViewMode.notebook });
              }
            },
          );

          /** Typical login, user has not used the editor before logging in */
        } else {
          setEditor({ viewMode: EditorViewMode.notebook });
        }
      }
    }
  }, [addNote, editor.viewMode, isLoading, isLoggedOut, setEditor, user?.id]);

  /** Handle Login based Promo Modal */
  useEffect(() => {
    // Promo
  }, []);

  return { closePromo, promos, viewMode: editor.viewMode };
};
