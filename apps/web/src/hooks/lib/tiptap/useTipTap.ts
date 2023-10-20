'use client';

import { Editor as TipTapEditor, useEditor as useTipTapEditor } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';

import Strike from '@tiptap/extension-strike';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Link from '@tiptap/extension-link';
import CharacterCount from '@tiptap/extension-character-count';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import CodeBlock from '@tiptap/extension-code-block';
import History from '@tiptap/extension-history';

import styles from './tip-tap.module.scss';
import Text from '@tiptap/extension-text';
import { useEditor } from '@hooks/context';
import { useEffect, useRef } from 'react';
import { EditorViewMode } from '@interface/editor';

Color.configure({
  types: ['textStyle'],
});

const characterLimit = 10000;
export const useTipTap = (viewMode: EditorViewMode = EditorViewMode.editor): [TipTapEditor | null, number] => {
  const isPreview = viewMode === EditorViewMode.notebook;

  const {
    editor: { id: noteId, content },
    setEditor,
  } = useEditor();
  const stickyNoteId = useRef<string | undefined>();

  const initialContent = useRef<string>(content);
  const editor: TipTapEditor | null = useTipTapEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Strike,
      Subscript,
      Superscript,
      Link.configure({
        protocols: ['ftp', 'mailto'],
        HTMLAttributes: {
          class: 'font-medium cursor-pointer',
        },
      }),
      CharacterCount.configure({
        limit: characterLimit,
      }),
      Blockquote,
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc',
        },
      }),
      OrderedList,
      ListItem.configure({
        HTMLAttributes: {
          class: 'list-disc',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: styles.codeContainer,
          spellcheck: false,
        },
      }),
      History,
    ],
    content: initialContent.current,
    autofocus: !isPreview,
    editable: !isPreview,
    injectCSS: false,
    onUpdate: ({ editor }) => {
      setEditor({ content: editor.getHTML(), stale: true });
    },
    editorProps: {
      attributes: {
        class: styles.editor,
      },
    },
  });

  /** Redundant focus command for navigation from other windows*/
  useEffect(() => {
    editor?.commands.focus();
  }, [editor]);

  /** Set Text content of editor when the note changes */
  useEffect(() => {
    if (noteId && stickyNoteId.current !== noteId) {
      stickyNoteId.current = noteId;
      setEditor({ content, stale: false });
      editor?.commands.setContent(content);
    }
  }, [content, editor?.commands, noteId, setEditor]);

  return [editor, characterLimit];
};
