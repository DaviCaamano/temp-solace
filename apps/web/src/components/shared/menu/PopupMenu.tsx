'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CSSProperties, PropsWithChildren, ReactNode, Ref, RefObject } from 'react';
import { useOuterClicks } from '@hooks/shared';
export type PopUpMenuItem = {
  onClick: () => void;
  component: ReactNode;
};
interface PopupMenuProps {
  open: boolean;
  /**
   * The menu closes when it detects clicks/taps outside the menu.
   * This field should include the refs for any elements you want to leave the menu open if they are clicked.
   */
  included?: RefObject<any>[] | RefObject<any>;
  items: PopUpMenuItem[] | PopUpMenuItem;
  name: string;
  setOpen: Setter<boolean>;
  wrapperStyle?: CSSProperties;
}
export const PopupMenu = ({ open, included, items: menuItems, name, setOpen, wrapperStyle }: PopupMenuProps) => {
  const clickRef = useOuterClicks(
    () => {
      setOpen(false);
    },
    undefined,
    included,
  );
  let items = !Array.isArray(menuItems) ? [menuItems] : menuItems;
  return (
    <div className={'popup absolute right-[1rem] top-[5rem] w-[9rem] flex justify-end z-50'} style={wrapperStyle}>
      <AnimatePresence>
        {open && (
          <motion.div
            className={'bg-mug border-tan border-2 rounded-[3px] overflow-hidden'}
            initial={'hidden'}
            animate={open ? 'shown' : 'hidden'}
            variants={containerAnimations}
            transition={{ duration: 0.2 }}
            exit={'hidden'}
            ref={clickRef as Ref<HTMLDivElement>}
          >
            <AnimatePresence>
              {items.map(({ component, onClick }: PopUpMenuItem, index: number) => (
                <MenuButton key={`${name}-${index}`} open={open} onClick={onClick}>
                  {component}
                </MenuButton>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const containerAnimations = {
  shown: {
    height: 'unset',
    width: '9rem',
  },
  hidden: {
    height: 0,
    width: 0,
  },
};

const contentAnimations = {
  shown: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

interface MenuButtonProps extends PropsWithChildren {
  open: boolean;
  onClick: () => void;
}
export const MenuButton = ({ children, onClick, open }: MenuButtonProps) => {
  if (!open) {
    return null;
  }
  return (
    <motion.div
      className={'bg-mug w-[9rem] py-1 transition duration-300 text-latte delay-200 '}
      initial={'hidden'}
      animate={open ? 'shown' : 'hidden'}
      variants={contentAnimations}
      transition={{ duration: 0.1, delay: 0.2 }}
      exit={'hidden'}
    >
      <div className={'menu-item-clicker w-full'} onClick={onClick}>
        <div className={`popup-menu-button ${MenuButtonTw}`}>
          <span
            className={'text-xl text-center decoration-1 w-full  '}
            style={{
              textDecorationThickness: '1px',
              textDecoration: 'inherit',
            }}
          >
            {children}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const MenuButtonTw = `w-full flex justify-start align-center 
    transition-all delay-[300ms] duration-[300ms] delay-2
    bg-mug hover:delay-0 hover:bg-pink hover:text-pink-complement`;
