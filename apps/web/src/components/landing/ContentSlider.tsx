'use client';

import { motion } from 'framer-motion';

const MotionDiv = motion.div;

import { ReactNode } from 'react';

interface SliderProps {
  open: boolean;
  children: ReactNode;
  showOnload?: boolean;
}
export const ContentSlider = ({ children, open }: SliderProps) => {
  if (!open) {
    return null;
  }
  return (
    <MotionDiv
      className={'relative'}
      initial={'hide'}
      animate={open ? 'show' : 'hide'}
      variants={animations}
      transition={{ duration: 0.3 }}
      exit={'hide'}
      style={{
        width: '100%',
      }}
    >
      <div className={'w-full h-full flex justify-center items-center'}>{children}</div>
    </MotionDiv>
  );
};

/** Animations for Content Windows */
const animations = {
  hide: {
    y: '-0.5rem',
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};
