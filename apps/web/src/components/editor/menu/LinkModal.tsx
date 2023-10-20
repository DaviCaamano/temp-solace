'use client';

import { Modal } from '@components/shared';
import { ChangeEvent, useState } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { Editor as TipTapEditor } from '@tiptap/react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { LinkModalColorBoard } from '@components/editor';
interface LinkModalProps {
  open: boolean;
  setOpen: Setter<boolean>;
  editor: TipTapEditor;
  link: string;
  setLink: Setter<string>;
}
export const LinkModal = ({ open, editor, link, setLink, setOpen }: LinkModalProps) => {
  const [invalidUrl, setInvalidUrl] = useState<boolean>(false);
  const [color, setColor] = useState<string | undefined>(undefined);

  return (
    <Modal open={open}>
      <form
        id={'link-modal'}
        className={'relative w-[43.75rem] flex flex-col mb-[-0.25rem]'}
        style={{ maxWidth: 'calc(100vw - 1.25rem)' }}
        onSubmit={confirmUrl({
          editor,
          color,
          link,
          setColor,
          setInvalidUrl,
          setOpen,
        })}
      >
        <div className={'flex justify-center absolute w-full pointer-events-none'} style={{ top: '-15px' }}>
          <LinkIcon className={'text-mug-light  w-[2rem]'} />
        </div>
        <input
          type={'text'}
          name={'url-input'}
          data-testid={'url-input'}
          value={link}
          placeholder={'https://www.example.com'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setInvalidUrl(false);
            setLink(event.target.value);
          }}
          id={'link-modal-input'}
          className={'flex-1 rounded-md border border-mug-light px-2 py-1 mt-2 outline-mug-light'}
        />
        <input type={'submit'} />
        <div id={'link-modal-button-container'} className={'flex flex-row justify-end mt-2'}>
          <LinkModalColorBoard selectedColor={color} setColor={setColor} />
          <button
            id={'link-modal-confirm-button'}
            data-testid={'link-modal-confirm-button'}
            className={`py-[1px] text-[12px] rounded-2xl text-latte w-[5rem] ${
              invalidUrl ? 'bg-pink' : 'bg-mug-light'
            }`}
            onClick={confirmUrl({
              editor,
              color,
              link,
              setColor,
              setInvalidUrl,
              setOpen,
            })}
          >
            <CheckIcon />
          </button>
          <button
            id={'link-modal-cancel-button'}
            className={'py-[1px] text-[12px] rounded-2xl bg-mug-light text-latte ml-1 w-[5rem]'}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </button>
        </div>
      </form>
    </Modal>
  );
};

/** Add Https:// to the start of the URL string if no protocol has been defined for the string.
 * Acceptable protocols include http, https, mailto, tel
 * @param url string - the url entered by the user.
 */
const addMissingProtocol = (url: string) => {
  const lowerCaseLink = url.toLowerCase();
  if (!lowerCaseLink.startsWith('http') && !lowerCaseLink.startsWith('tel') && !lowerCaseLink.startsWith('mailto:')) {
    return 'https://' + url;
  }
  return url;
};

const CheckUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e: any) {
    return false;
  }
};

interface ConfirmArgs {
  editor: TipTapEditor;
  color: string | undefined;
  setColor: Setter<string | undefined>;
  link: string;
  setInvalidUrl: Setter<boolean>;
  setOpen: Setter<boolean>;
}
/** Set the Link on the Highlighted Text or Remove the Link from highlighted text that already has the provided link.
 * Also sets the color of the text if a color is selected.
 */
const confirmUrl =
  ({ color, editor, link, setColor, setOpen, setInvalidUrl }: ConfirmArgs) =>
  () => {
    if (!link) {
      setInvalidUrl(false);
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const parsedLink = addMissingProtocol(link);
    if (CheckUrl(parsedLink)) {
      setInvalidUrl(false);
      let editorExecution = editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .toggleLink({ href: parsedLink, target: '_blank' });
      if (color) {
        editorExecution = editorExecution.setColor(color);
        setColor(undefined);
      }
      editorExecution.run();
    } else {
      setInvalidUrl(true);
    }
    setOpen(false);
  };
