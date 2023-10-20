import { useState } from 'react';
import { SideBarPane } from '@components/sidebar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div id={'side-bar'} className={'absolute left-0 top-0 min-h-screen h-full w-[18.75rem]'}>
      <div className={'relative w-full h-full'}>
        <SideBarPane open={open} />
        <MenuButton setOpen={setOpen} />
      </div>
    </div>
  );
};

interface MenuButtonProps {
  setOpen: Setter<boolean>;
}
const MenuButton = ({ setOpen }: MenuButtonProps) => {
  return (
    <a id={'menu-button'} onClick={() => setOpen((prev: boolean) => !prev)}>
      <MenuRoundedIcon
        id={'menu-button'}
        className={'text-[2.5rem] text-latte cursor-pointer absolute top-2 left-3 w-[3rem] h-[2.75rem] z-10'}
      />
    </a>
  );
};
