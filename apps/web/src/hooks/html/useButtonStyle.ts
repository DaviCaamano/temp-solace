import { CSSProperties, useState } from 'react';
type UseButtonEvents = {
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
};
/**
 * Takes two css definitions (CSS properties JSON or strings for class names) and returns the css for the button's state
 * Button states:
 *    PRESSED: Button is currently being pressed (returns pressedCss @param)
 *    UNPRESSED: Button is not currently being pressed (returns unpressedCss @param)
 * @param unpressedCss - CSS Properties JSON or class string
 * @param pressedCss - CSS Properties JSON or class string
 */
export const useButtonStyle = (
  pressedCss: string | CSSProperties,
  unpressedCss?: string | CSSProperties,
): [string | CSSProperties | undefined, UseButtonEvents] => {
  const [pressed, setPressed] = useState<boolean>(false);

  const events: UseButtonEvents = {
    onMouseDown: () => {
      setPressed(true);
    },
    onMouseUp: () => {
      setPressed(false);
    },
    onMouseLeave: () => {
      setPressed(false);
    },
  };
  return [pressed ? pressedCss : unpressedCss, events];
};
