import { Editor as TipTapEditor } from '@tiptap/react';
import colors from '@styles/tailwind/colors';
import { EditorColorBoard, EditorMenuButton } from '@components/editor';
import { hexOpacity } from '@utils/color';
import { ColorBoard } from '@interface/editor';

const defaultColor = colors.latte;
interface EditorMenuButtonProps {
  editor: TipTapEditor;
  open: boolean;
  setOpen: Setter<ColorBoard>;
}
export const EditorTextColorButton = ({ editor, open, setOpen }: EditorMenuButtonProps) => {
  const selectedColor = getColor(editor);
  return (
    <div id={'editor-color-picker-container'} className={'relative '}>
      <EditorMenuButton
        id={'editor-color-picker'}
        onClick={() => setOpen(open ? ColorBoard.none : ColorBoard.text)}
        className={'font-bold flex flex-col bg-latte bg-opacity-5 h-full'}
        color={selectedColor}
      >
        <Icon selectedColor={selectedColor} />
        <EditorColorBoard
          open={open}
          selectedColor={selectedColor}
          setColor={(color: string) => editor.chain().focus().setColor(color).run()}
          positions={{
            xOpened: '71px',
            xClosed: '-55px',
          }}
        />
      </EditorMenuButton>
    </div>
  );
};

const Icon = ({ selectedColor }: { selectedColor?: string }) => (
  <>
    <div className={'text-8 leading-4 h-4'} style={{ textShadow }}>
      A
    </div>
    <div
      id={'color-picker-underline'}
      className={'w-[1.125rem] mt-[-0.0625rem] h-[0.1875rem] p-0'}
      style={{ backgroundColor: selectedColor, boxShadow: textShadow }}
    />
  </>
);

//* Stroke Effect */
const shadowColor = hexOpacity(colors.coffee, 0.15);
const textShadow = `-0.5px -0.5px 0 ${shadowColor}, 0.5px -0.5px 0 ${shadowColor}, -0.5px 0.5px 0 ${shadowColor}, 0.5px 0.5px 0 ${shadowColor}`;
const getColor = (editor: TipTapEditor) => {
  const textColor = editor.getAttributes('textStyle').color;
  return typeof textColor === 'string' ? textColor : defaultColor;
};
