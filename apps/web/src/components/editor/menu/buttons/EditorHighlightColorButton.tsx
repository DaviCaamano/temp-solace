import { Editor as TipTapEditor } from '@tiptap/react';
import colors from '@styles/tailwind/colors';
import { EditorColorBoard, EditorMenuButton } from '@components/editor';
import { editorColors } from '@constants/editor/editorColors';
import { ColorBoard } from '@interface/editor';
import HighLightIcon from '@images/icons/highlight-text.svg';

const defaultColor = colors.brown;
interface EditorMenuButtonProps {
  editor: TipTapEditor;
  open: boolean;
  setOpen: Setter<ColorBoard>;
}
export const EditorHighlightColorButton = ({ editor, open, setOpen }: EditorMenuButtonProps) => {
  const selectedColor = getColor(editor);

  return (
    <div id={'editor-highlight-button-container'} className={'relative '}>
      <EditorMenuButton
        id={'editor-highlight-button'}
        onClick={() => setOpen(open ? ColorBoard.none : ColorBoard.highlight)}
        className={'font-bold flex flex-col bg-latte bg-opacity-5 h-full'}
        color={selectedColor}
      >
        <Icon selectedColor={selectedColor} />
        <EditorColorBoard
          open={open}
          selectedColor={selectedColor}
          setColor={(color: string) => editor.chain().focus().toggleHighlight({ color }).run()}
          positions={{
            xOpened: '35px',
            xClosed: '-17px',
          }}
        />
      </EditorMenuButton>
    </div>
  );
};

const Icon = ({ selectedColor }: { selectedColor?: string }) => {
  return (
    <HighLightIcon
      alt={'Click here to highlight text background.'}
      color={selectedColor}
      width={'1.375rem'}
      className={'w-[1.5rem] h-[1.75rem]'}
    />
  );
};

const getColor = (editor: TipTapEditor) => {
  if (!editor.isActive('highlight')) {
    return defaultColor;
  }
  for (let key in editorColors) {
    if (editor.isActive('highlight', { color: editorColors[key] })) {
      return editorColors[key];
    }
  }
  return defaultColor;
};
