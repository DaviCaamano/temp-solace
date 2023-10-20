'use client';

import { Modal } from '@components/shared';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { colors } from '@styles/tailwind';
import { hexOpacity } from '@utils/color';
import styles from './sign-up-promo.module.scss';
interface SignUpPromo {
  open: boolean;
  setOpen: Setter<boolean>;
}
export const SignUpPromo = ({ open, setOpen }: SignUpPromo) => {
  const router = useRouter();
  return (
    <Modal
      open={open}
      close={() => setOpen(false)}
      styles={{
        modal: { padding: 0, borderRadius: '3rem', overflow: 'hidden' },
        dialog: { borderRadius: '3rem', overflow: 'hidden' },
        close: {
          width: '1.5rem',
          height: '1.5rem',
          right: '1.5rem',
          top: '1.5rem',
          backgroundColor: colors.tan,
          color: colors.latte,
          border: `1px solid ${hexOpacity(colors.latte, 0.25)}`,
        },
      }}
    >
      <div id={'sign-up-promo'} className={styles.container}>
        <div id={'sign-up-promo-content'} className={'flex flex-col md:flex-row justify-between'}>
          <div className={styles.imageContainer}>
            <picture className={styles.imageSwitch}>
              <source
                media={'(min-width: 768px)'}
                srcSet={'/images/promotional/sign-up-promotion-lg.webp'}
                width={748}
                height={549}
              />
              <source
                media={'(min-width: 480px)'}
                srcSet={'/images/promotional/sign-up-promotion-sm.webp'}
                width={400}
                height={700}
              />
              <Image
                src={'/images/promotional/sign-up-promotion-xs.webp'}
                alt={'Sign up today!'}
                width={300}
                height={525}
                priority
              />
            </picture>

            <div className={'absolute top-0 left-0 h-full w-full flex items-center flex-col'}>
              <div className={styles.headlineBox} style={{ textShadow }}>
                Building a Universe
                <br className={'block md:hidden'} /> is Hard Work
              </div>
              <div className={styles.line2} style={{ textShadow }}>
                ...but you don{"'"}t need <br className={'md:hidden'} />
                to do it alone.
              </div>
              <div className={'w-full flex justify-end mt-[1.25rem] sm:mt-[1.75rem] md:mt-[1.5rem] pr-1 md:pr-4'}>
                <div className={styles.line3} style={{ textShadow }}>
                  Fill the gaps in your creations with a few Notes from Solace
                </div>
              </div>
            </div>
            <div
              className={`sign-up-promo-button-container ${styles.buttonContainer}`}
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background: linearGradient,
              }}
            >
              <button
                id={'sign-up-promo-button'}
                className={styles.signupButton}
                style={{ borderColor: hexOpacity(colors.latte, 0.5) }}
                onClick={() => router.push('/api/auth/login').then()}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const textShadow = '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000';
const linearGradient = `linear-gradient(${hexOpacity(colors.latte, 0.5)} 0%, ${hexOpacity(
  colors.latte,
  0.25,
)}, 75%, ${hexOpacity(colors.latte, 0.5)})`;
