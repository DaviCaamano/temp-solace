import { MoveNotePosition } from '#interfaces/notes';
import { ArrowBendUpRight, ArrowElbowDownRight, ArrowLineDown } from 'phosphor-react';
import { colors } from '@styles/tailwind';
interface ZoneIconProps {
  moveType: MoveNotePosition | boolean | undefined;
}
export const RowZoneIcon = ({ moveType }: ZoneIconProps) => {
  switch (moveType) {
    case MoveNotePosition.aheadOf:
      return (
        <div className={'title-icon-container flex justify-center items-center right-full w-7 h-7'}>
          <ArrowBendUpRight className={'relative text-latte-lighter'} size={28} color={colors.latte} weight='bold' />
        </div>
      );
    case MoveNotePosition.childOf:
      return (
        <div className={'title-icon-container flex justify-center items-center right-full w-7 h-7'}>
          <ArrowElbowDownRight className={'relative text-latte-lighter'} size={28} color={colors.latte} weight='bold' />
        </div>
      );
    case MoveNotePosition.lastChildOf:
      return (
        <div className={'title-icon-container flex justify-center items-center right-full w-7 h-7'}>
          <ArrowLineDown className={'relative text-latte-lighter'} size={28} color={colors.latte} weight='bold' />
        </div>
      );
    default:
      return null;
  }
};
