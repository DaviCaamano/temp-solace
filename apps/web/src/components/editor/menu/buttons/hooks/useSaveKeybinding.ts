import { useEffect } from 'react';

type CallBack = (event: KeyboardEvent) => void;
export const useSaveKeybinding = (callback: CallBack, disabled: boolean = false) => {
  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if (!disabled && event.key === 's' && event.ctrlKey) {
        event.preventDefault();
        callback?.(event);
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [callback, disabled]);
};
