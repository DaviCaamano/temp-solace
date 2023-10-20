'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { editorColors } from '@constants/editor/editorColors';
import { EditorColorTile } from './EditorColorTile';
const MotionDiv = motion.div;

interface PickerProps {
  open: boolean;
  selectedColor?: string;
  setColor: (color: string) => void;
  positions: {
    xOpened: string;
    xClosed: string;
  };
}
export const EditorColorBoard = ({ open, selectedColor, setColor, positions: { xOpened, xClosed } }: PickerProps) => {
  const colors = Object.entries(editorColors).map(([name, color]: [string, string]) => (
    <EditorColorTile
      key={'editor-color-tile-' + name}
      color={color}
      name={name}
      onClick={() => setColor(color)}
      selectedColor={selectedColor}
    />
  ));

  const containerAnimations = {
    closed: {
      scale: 0,
      x: xClosed,
    },
    open: {
      scale: 1,
      x: 0,
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionDiv
          id={'color-board-animation'}
          className={'absolute'}
          initial={'closed'}
          animate={open ? 'open' : 'closed'}
          variants={containerAnimations}
          transition={{ duration: 0.3 }}
          exit={'closed'}
          style={{
            top: '-0.625rem',
            left: xOpened,
          }}
        >
          <div className={'relative w-full h-full '}>
            <div
              className={'z-10 absolute '}
              style={{
                bottom: 0,
                right: '-100%',
              }}
            >
              <div
                id={'color-picker'}
                data-testid={'color-picker'}
                className={'flex flex-row flex-wrap p-2 rounded-xl w-[11.25rem] bg-mug border-mug border'}
              >
                {colors}
              </div>
            </div>
          </div>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};
