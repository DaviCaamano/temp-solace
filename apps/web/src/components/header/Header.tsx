'use client';

import { LoginLink } from './LoginLink';
import { UserMenu } from './UserMenu';
import { useLogin } from '@hooks/user';
import Image from 'next/image';
import { Tooltip } from '@components/shared';
import { useState } from 'react';

export const Header = () => {
  const { isLoading, isLoggedOut } = useLogin();
  const [solaceTooltip, setSolaceTooltip] = useState<boolean>(false);
  return (
    <div id={'header'} className={'w-full h-20 flex flex-row items-center justify-between pt-4 px-12'}>
      <Tooltip
        content={<SolaceTooltip />}
        tooltip={{ style: { left: -24, transform: 'unset' } }}
        open={solaceTooltip}
        setOpen={setSolaceTooltip}
      >
        <Image
          key={'header-image'}
          src={'/images/shared/solace-face.webp'}
          alt={'Solace, your AI companion'}
          width={48}
          height={48}
          style={{ position: 'relative', bottom: 5 }}
          onMouseEnter={() => setSolaceTooltip(true)}
          onMouseLeave={() => setSolaceTooltip(false)}
          onClick={() => setSolaceTooltip(!solaceTooltip)}
        />
      </Tooltip>
      <div className={'flex flex-col h-full'}>
        <UserMenu loggedIn={!isLoading && !isLoggedOut} />
        <LoginLink show={!isLoading && isLoggedOut} />
      </div>
    </div>
  );
};

const SolaceTooltip = () => (
  <div>
    <div className={'text-[0.75rem] xs:text-[0.8rem] sm:text-[0.9rem]'}>
      Your Assistant <span className={'text-tan-light font-semibold'}>Solace</span> will help you
      <br /> fill in the gaps in your work.
      <br /> From paragraphs to pages,
      <br /> Starships to villainous dragons...
      <br />
      <br /> Click here and <br className={'block sm:hidden'} />
      Solace will give you some notes.
      <br />
      <br />
      <span className={'text-pink font-bold'}>THIS FEATURE IS NOT YET AVAILABLE</span>
    </div>
  </div>
);
