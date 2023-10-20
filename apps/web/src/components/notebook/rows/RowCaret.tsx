import { colors } from '@styles/tailwind';
import { CaretRight } from 'phosphor-react';
import { TreeNote } from '#interfaces/notes';
import { EditorViewMode } from '@interface/editor';
import { useEditor } from '@hooks/context';

interface RowCaretProps {
  note: TreeNote;
  rowDragged: TreeNote | undefined;
}
export const RowCaret = ({ note, rowDragged }: RowCaretProps) => {
  const { setEditor } = useEditor();

  const onClick = (event) => {
    event.preventDefault();
    setEditor({
      id: note.id,
      title: note.title,
      content: note.content,
      stale: false,
      viewMode: EditorViewMode.editor,
    });
  };

  return rowDragged ? null : (
    <div
      className={'row-caret absolute'}
      onClick={onClick}
      style={{ right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
    >
      <CaretRight size={32} color={colors.tan} weight='bold' />
    </div>
  );
};
