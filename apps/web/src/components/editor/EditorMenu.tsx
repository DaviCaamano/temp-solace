'use client';

import { Editor as TipTapEditor } from '@tiptap/react';
import {
  BlockButtonContainer,
  BoldButton,
  EditorHighlightColorButton,
  EditorTextColorButton,
  ItalicsButton,
  LinkButtonContainer,
  ListButtonContainer,
  LinkModal,
  ScriptButtonContainer,
  StrikeButton,
  UnderlineButton,
  SuperScriptButton,
  SubScriptButton,
  OrderedListButton,
  BulletButton,
  ClearLinkButton,
  LinkButton,
  CodeBlockButton,
  BlockQuoteButton,
} from '@components/editor/menu';
import { ColorBoard } from '@interface/editor';
import { useState } from 'react';
import { Device } from '@components/shared/Device';

interface EditorMenuProps {
  editor: TipTapEditor;
}
export const EditorMenu = ({ editor }: EditorMenuProps) => {
  const [colorBoard, setColorBoard] = useState<ColorBoard>(ColorBoard.none);
  const [linkModalOpen, setLinkModalOpen] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');

  return (
    <div id={'editor-menu'} className={'flex flex-col w-full mb-2 relative'}>
      <div id={'editor-menu-row'} className={'flex flex-row h-8 w-full mb-2 relative'}>
        <BoldButton editor={editor} />
        <ItalicsButton editor={editor} />
        <UnderlineButton editor={editor} />
        <EditorTextColorButton editor={editor} open={colorBoard === ColorBoard.text} setOpen={setColorBoard} />

        <EditorHighlightColorButton
          editor={editor}
          open={colorBoard === ColorBoard.highlight}
          setOpen={setColorBoard}
        />
        <StrikeButton editor={editor} />

        <Device showForDesktop>
          <ScriptButtonContainer editor={editor} />
          <ListButtonContainer editor={editor} />
          <LinkButtonContainer editor={editor} setLink={setLink} setOpen={setLinkModalOpen} />
          <BlockButtonContainer editor={editor} />
        </Device>

        <LinkModal open={linkModalOpen} link={link} setLink={setLink} setOpen={setLinkModalOpen} editor={editor} />
      </div>
      <Device showForMobile>
        <div id={'editor-menu-row-mobile'} className={'flex flex-row h-8 w-full mb-2 relative'}>
          <SuperScriptButton editor={editor} />
          <SubScriptButton editor={editor} isMobile />
          <div className={'spacer xs:ml-1'} />
          <OrderedListButton editor={editor} />
          <BulletButton editor={editor} isMobile />
          <div className={'spacer xs:ml-1'} />
          <LinkButton editor={editor} setLink={setLink} setOpen={setLinkModalOpen} isMobile />
          <ClearLinkButton editor={editor} />
          <div className={'spacer xs:ml-1'} />
          <BlockQuoteButton editor={editor} />
          <CodeBlockButton editor={editor} isMobile />
        </div>
      </Device>
    </div>
  );
};
