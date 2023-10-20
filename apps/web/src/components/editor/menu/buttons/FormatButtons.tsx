import { Editor as TipTapEditor } from '@tiptap/react';
import { EditorMenuButton } from '@components/editor';

interface EditorMenuButtonProps {
  editor: TipTapEditor;
}

export const BoldButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      id={'editor-bold-button'}
      active={editor.isActive('bold')}
      onClick={() => editor.chain().toggleBold().focus().run()}
      className={'font-bold'}
    >
      B
    </EditorMenuButton>
  );
};

export const ItalicsButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      id={'editor-italic-button'}
      active={editor.isActive('italic')}
      onClick={() => editor.chain().toggleItalic().focus().run()}
      className={'italic'}
    >
      I
    </EditorMenuButton>
  );
};

export const UnderlineButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      id={'editor-underline-button'}
      active={editor.isActive('underline')}
      onClick={() => editor.chain().toggleUnderline().focus().run()}
      className={'underline'}
    >
      U
    </EditorMenuButton>
  );
};

export const StrikeButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <EditorMenuButton
      id={'editor-strike-button'}
      active={editor.isActive('strike')}
      onClick={() => editor.chain().focus().toggleStrike().run()}
      className={'font-medium relative px-1'}
    >
      S
      <div
        className={
          'absolute font-medium translate-x-[-50%]  font-green bg-latte w-[1.125rem] mt-[-0.0625rem] h-[0.0625rem] p-0'
        }
        style={{
          top: '50%',
          left: '50%',
        }}
      />
    </EditorMenuButton>
  );
};
