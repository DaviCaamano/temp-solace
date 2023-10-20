import { CSSProperties, PropsWithChildren, useEffect, useRef } from 'react';
import mStyles from './modal.module.scss';
import CloseIcon from '@mui/icons-material/Close';

interface ModalStyles {
  dialog?: CSSProperties;
  modal?: CSSProperties;
  close?: CSSProperties;
}
export interface ModalProps extends PropsWithChildren {
  open: boolean;
  close?: () => void;
  onClose?: () => void;
  styles?: ModalStyles;
}
export const Modal = ({ children, onClose, open, close, styles }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogIsOpen = dialogRef.current?.open;
  useEffect(() => {
    if (open && !dialogIsOpen) {
      dialogRef.current?.showModal();
    } else if (!open && dialogIsOpen) {
      dialogRef.current?.close();
    }
  }, [dialogIsOpen, open]);

  useEffect(() => {
    const closeListener = () => {
      onClose?.();
    };

    const ref = dialogRef.current;
    ref?.addEventListener('close', closeListener);

    return () => {
      ref?.removeEventListener('close', closeListener);
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className={`shared-modal ${mStyles.sharedModal}`} style={styles?.dialog}>
      {open && (
        <div
          id={'shared-modal-content'}
          className={`p-2 sm:p-4 rounded-xl overscroll-x-none ${mStyles.modalContent}`}
          style={styles?.modal}
        >
          {children}
          {close && <Close onClick={close} style={styles?.close} />}
        </div>
      )}
    </dialog>
  );
};

interface CloseButtonProps {
  onClick: () => void;
  style?: CSSProperties;
}
const Close = ({ onClick, style }: CloseButtonProps) => {
  const fontSize = style?.height || style?.width || '1.5rem';
  return (
    <div
      className={'absolute bg-latte rounded-[2rem] flex justify-center items-center w-4 h-4 cursor-pointer'}
      style={{
        top: '10px',
        right: '10px',
        ...style,
      }}
      onClick={onClick}
    >
      <CloseIcon sx={{ fontSize, fontWeight: '700' }} />
    </div>
  );
};
