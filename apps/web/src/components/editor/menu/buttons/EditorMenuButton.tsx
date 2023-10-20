'use client';

import { PropsWithChildren, useState } from 'react';

import styles from '@components/editor/menu/buttons/editor-buttons.module.scss';
import { colors } from '@styles/tailwind';

const onCss = 'border-[2px] bg-opacity-20';
const pressedCss = 'border-[2px] bg-opacity-50';
const offCss = 'bg-opacity-0';
const disabledCss = 'bg-mug-disabled';

type UseButtonEvents = {
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
  onClick: () => void;
};

interface EditorMenuButtonTemplate extends PropsWithChildren {
  id: string;
  active?: boolean | undefined;
  className?: string;
  color?: string;
  disabled?: boolean;
  onClick: () => void;
}
export const EditorMenuButton = ({
  active,
  className,
  color,
  children,
  disabled = false,
  onClick,
  id,
}: EditorMenuButtonTemplate) => {
  const [pressed, setPressed] = useState<boolean>(false);

  const events: UseButtonEvents = {
    onMouseDown: () => {
      setPressed(true);
    },
    onMouseUp: () => {
      setPressed(false);
    },
    onMouseLeave: () => {
      setPressed(false);
    },
    onClick: onClick,
  };

  const css = disabled ? disabledCss : pressed ? pressedCss : active ? onCss : offCss;
  return (
    <button
      id={id}
      data-testid={id}
      className={
        'editor-menu-button flex justify-center items-center w-8 mr-1 text-8 font-bold box-border ' +
        ` border-[1px] border-latte rounded-md text-latte ${css} ${styles.noHighlight} ${className || ''} `
      }
      {...events}
      style={{
        color: disabled ? colors.brown : color,
      }}
    >
      {children}
    </button>
  );
};
