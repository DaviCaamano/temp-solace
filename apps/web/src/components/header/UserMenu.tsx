'use client';

import { RefObject, useRef, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { PopupMenu, PopUpMenuItem } from '@components/shared/menu';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  loggedIn: boolean;
}
export const UserMenu = ({ loggedIn }: UserMenuProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const iconRef: RefObject<HTMLAnchorElement> = useRef<HTMLAnchorElement>(null);
  const router = useRouter();

  const logoutButton: PopUpMenuItem = {
    onClick: () => router.push('/api/auth/logout'),
    component: 'Logout',
  };

  return (
    <div className={'user-menu-container flex items-center'}>
      <PopupMenu open={open} included={iconRef} setOpen={setOpen} items={logoutButton} name={'user-menu'} />
      <UserIcon iconRef={iconRef} loggedIn={loggedIn} setOpen={setOpen} />
    </div>
  );
};

interface UserIconProps {
  iconRef: RefObject<HTMLAnchorElement>;
  loggedIn: boolean;
  setOpen: Setter<boolean>;
}
const UserIcon = ({ iconRef, loggedIn, setOpen }: UserIconProps) => (
  <a onClick={() => setOpen((prev: boolean) => !prev)} ref={iconRef}>
    <AccountCircleIcon className={`text-xl text-latte fade_7 cursor-pointer w-12 h-12 ${!loggedIn && 'fadeOut'}`} />
  </a>
);
