import { RefObject, useEffect, useRef } from 'react';

type InputRef = RefObject<HTMLInputElement>;

export const NoteTitleInput = ({
  toggle,
  onSubmit,
  onBlur,
  title,
  setTitle,
}: {
  toggle: boolean;
  onSubmit: () => void;
  onBlur?: () => void;
  title: string;
  setTitle: Setter<string>;
}) => {
  const inputRef: InputRef = useRef<HTMLInputElement>(null);
  const stickyToggle = useRef<boolean>(false);
  useEffect(() => {
    if (toggle !== stickyToggle.current) {
      stickyToggle.current = toggle;
      if (toggle) {
        inputRef.current?.focus();
      }
    }
  }, [toggle]);

  return (
    <input
      id={'add-note-input'}
      data-testid={'add-note-input'}
      className={`${toggle ? 'block' : 'pointer-events-none'} flex-1 px-2 border-0 bg-chalkboard text-xl mr-4`}
      ref={inputRef}
      placeholder={toggle ? 'Title' : ''}
      onBlur={() => {
        if (!title) {
          onBlur?.();
        }
      }}
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      onKeyUp={(event) => event.key === 'Enter' && onSubmit()}
    />
  );
};
