import styles from '@components/notebook/notebook.module.scss';
import { ArrowLeft } from 'phosphor-react';
import { colors } from '@styles/tailwind';
import { Editor, EditorViewMode } from '@interface/editor';
import { TreeNote } from '#interfaces/notes';
import { getFocusedNote } from '@components/notebook/utils';

interface BackButtonProps {
  noteList: TreeNote[] | undefined;
  show: boolean;
  selectedNote: TreeNote | undefined;
  setEditor: (editor: Partial<Editor>) => void;
}
export const HeaderBackButton = ({ noteList, show, selectedNote, setEditor }: BackButtonProps) => {
  const goBack = () => {
    if (noteList) {
      /** Selected Note is a root note */
      if (selectedNote?.parentId === null) {
        /** Unselect Note */
        return setEditor({
          id: undefined,
          content: undefined,
          title: undefined,
          stale: false,
          viewMode: EditorViewMode.notebook,
        });
      }
      /** Not Root Note, so find the parent of the currently selected note and select it instead */
      const newParent = getFocusedNote(selectedNote?.parentId, noteList).focused;
      if (newParent) {
        const { id, content, title } = newParent;
        setEditor({
          id,
          content,
          title,
          stale: false,
          viewMode: EditorViewMode.notebook,
        });
      }
    }
  };

  return (
    <div className={`${styles.headerBack} ${show ? 'block' : 'hidden'}`}>
      <div className={styles.headerBackBackground} />
      <div className={styles.headerBackIconContainer}>
        <div className={styles.headerBackIconFramer} onClick={goBack}>
          <ArrowLeft
            size={44}
            color={colors.mug}
            weight={'bold'}
            style={{ zIndex: 1 }}
            className={styles.headerBackIcon}
          />
        </div>
      </div>
    </div>
  );
};
