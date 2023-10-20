'use client';

import { useState } from 'react';
import { EditorMenuButton } from '@components/editor';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import { colors } from '@styles/tailwind';
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
interface LinkButtonProps extends EditorMenuButtonProps {
  isMobile?: boolean;
  setLink: Setter<string>;
  setOpen: Setter<boolean>;
}
export const LinkButtonContainer = ({ editor, setLink, setOpen }: LinkButtonProps) => {
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
          <ClearLinkButton editor={editor} />
          <LinkButton editor={editor} setLink={setLink} setOpen={setOpen} />
        </div>
      </MotionDiv>
    </div>
  );
};

export const LinkButton = ({ editor, isMobile, setLink, setOpen }: LinkButtonProps) => {
  return (
    <div
      id={'link-button-container'}
      className={`font-medium ${!isMobile ? 'absolute bottom-0 left-0' : 'xs:mr-1'} h-8 w-8 bg-brown p-0 rounded-md`}
    >
      <EditorMenuButton
        id={'editor-link-button'}
        active={editor.isActive('link')}
        onClick={() => {
          setLink(editor.getAttributes('link').href || '');
          setOpen(true);
        }}
        className={'font-medium relative px-1 h-8'}
      >
        <LinkIcon />
      </EditorMenuButton>
    </div>
  );
};

export const ClearLinkButton = ({ editor }: EditorMenuButtonProps) => {
  return (
    <div id={'clear-link-button-container'} className={'font-medium relative h-8 w-8 bg-brown p-0 rounded-md'}>
      <EditorMenuButton
        id={'editor-clear-link-button'}
        active={editor.isActive('link')}
        onClick={() => editor.commands.unsetLink()}
        className={'font-medium relative px-1 h-8 w-8'}
      >
        <LinkIcon className={'relative'} />
        <CloseIcon
          className={'absolute'}
          style={{
            right: '0',
            bottom: '2px',
            fontSize: '18px',
            color: colors.pink,
          }}
        />
      </EditorMenuButton>
    </div>
  );
};
