import { CSSProperties } from 'react';
import { invertHighlightForColor } from '@constants/editor/editorColors';
import { colors } from '@styles/tailwind';
import { hexOpacity } from '@utils/color';

interface ColorProps {
  color: string;
  name: string;
  onClick: () => void;
  selectedColor: string | undefined;
  style?: CSSProperties;
}
export const EditorColorTile = ({ color, name, onClick, selectedColor }: ColorProps) => (
  <div
    id={'color-picker-tile-' + name}
    className={'w-6 h-6 rounded-3xl border-white border-opacity-50 border m-1 '}
    style={selectedCSS(selectedColor, color)}
    onClick={(event) => {
      event?.preventDefault();
      onClick();
    }}
  />
);

const selectedCSS = (selectedColor: string | undefined, color: string): CSSProperties => {
  if (selectedColor === color) {
    if (invertHighlightForColor.includes(color)) {
      return {
        backgroundColor: color,
        borderWidth: '4px',
        borderColor: hexOpacity(colors['mug-gray'], 0.5),
      };
    }
    return {
      backgroundColor: color,
      borderWidth: '4px',
      borderColor: hexOpacity(colors.latte, 0.5),
    };
  }
  return {
    backgroundColor: color,
  };
};
