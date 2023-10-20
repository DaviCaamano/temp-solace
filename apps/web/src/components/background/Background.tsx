import { ReactNode } from 'react';
import styles from './background.module.scss';
interface BackgroundProps {
  children: ReactNode;
}
export const Background = ({ children }: BackgroundProps) => {
  return (
    <div id={'global-background'} className={styles.container}>
      {children}
      <div id={'global-background-framer'} className={styles.framer}>
        <div
          id={'global-background-image-container'}
          className={'flex justify-start w-full max-width-full xs:min-w-[49.125rem]'}
          style={{ direction: 'rtl' }}
        >
          <picture>
            <source media={'(min-width: 320px)'} srcSet={'/images/background/bg-320.webp'} style={{ width: '786px' }} />
            <img
              id={'global-background-image'}
              src={'/images/background/bg-0-319.webp'}
              alt={'Notes for Solace Background'}
            />
          </picture>
        </div>
      </div>
    </div>
  );
};
