'use client';

import { useState } from 'react';
import { EditorMenuButton } from '@components/editor';
import { motion } from 'framer-motion';
import { Editor as TipTapEditor } from '@tiptap/react';
const MotionDiv = motion.div;

const linkAnimations = {
  show: {
    height: '72px',
  },
  hide: {
    height: '32px',
  },
};

interface LinkButtonMouseover {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
interface EditorMenuButtonProps {
  editor: TipTapEditor;
}
interface EditorMenuScriptButtonProps extends EditorMenuButtonProps {
  isMobile?: boolean;
}
export const ScriptButtonContainer = ({ editor }: EditorMenuButtonProps) => {
  const [mousedOver, setMousedOver] = useState<boolean>(false);

  const events: LinkButtonMouseover = {
    onMouseEnter: () => {
      setMousedOver(true);
    },
    onMouseLeave: () => {
      setMousedOver(false);
    },
  };
  return (
    <div className={'w-8 h-8 mr-1 relative'}>
      <MotionDiv
        className={'absolute w-8'}
        style={{ bottom: 0, left: 0 }}
        variants={linkAnimations}
        initial={'hide'}
        animate={mousedOver ? 'show' : 'hide'}
        transition={{ duration: 0.3333 }}
        {...events}
      >
        <div className={'relative w-full h-full rounded-md'}>
          <SuperScriptButton editor={editor} />
          <SubScriptButton editor={editor} />
        </div>
      </MotionDiv>
    </div>
  );
};

export const SubScriptButton = ({ editor, isMobile }: EditorMenuScriptButtonProps) => {
  return (
    <div
      id={'clear-link-button-container'}
      className={`font-medium ${!isMobile ? 'absolute bottom-0 left-0' : 'ml-1'} h-8 w-8 bg-brown p-0 rounded-md`}
    >
      <EditorMenuButton
        id={'editor-subscript-button'}
        active={editor.isActive('subscript')}
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={'font-medium relative px-1 w-8 h-8'}
      >
        X<sub>y</sub>
      </EditorMenuButton>
    </div>
  );
};

export const SuperScriptButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <div id={'editor-list-button-container'} className={'font-medium relative h-8 w-8 bg-brown p-0 rounded-md'}>
      <EditorMenuButton
        id={'editor-superscript-button'}
        active={editor.isActive('superscript')}
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={'font-medium relative px-1 h-8 w-8'}
      >
        X<sup>y</sup>
      </EditorMenuButton>
    </div>
  );
};
