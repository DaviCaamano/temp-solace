import { CSSProperties, useEffect, useRef, useState } from 'react';

type UseButtonEvents = {
  onMouseUp: () => void;
  onMouseLeave: () => void;
  onMouseDown: () => void;
};

export interface UseToggledStyle {
  toggled: boolean;
  pressed: boolean;
  css: string | CSSProperties | undefined;
  events: UseButtonEvents;
  onClick?: () => void;
}
export interface UseToggleStyleProps {
  onCss: string | CSSProperties;
  offCss?: string | CSSProperties;
  pressedCss?: string | CSSProperties;
  onToggle?: (toggled: boolean) => void;
}
/**
 * Takes a onToggle property which runs when the button's toggle state has changed
 * In addition Takes three css definitions (CSS properties JSON or strings for class names) and returns the css for
 *  the button's state
 * @param onToggle - (toggled: boolean) => void
 * Button states:
 *    ON: Button is not currently being pressed but has been toggled on (returns onCss @param)
 *    OFF: Button is not currently being pressed but has been toggled off (returns offCss @param)
 *    PRESSED: Button is currently being pressed and can be either toggled on or off (returns pressedCss @param)
 * @param onCss - CSS Properties JSON or class string
 * @param offCss - CSS Properties JSON or class string
 * @param pressedCss - CSS Properties JSON or class string
 */
export const useToggle = ({ onCss, offCss, pressedCss, onToggle }: UseToggleStyleProps): UseToggledStyle => {
  const [toggled, setToggled] = useState<boolean>(false);
  const [pressed, setPressed] = useState<boolean>(false);
  const stickyToggle = useRef<boolean>(false);
  useEffect(() => {
    if (toggled !== stickyToggle.current) {
      stickyToggle.current = toggled;
      onToggle?.(toggled);
    }
  });
  const events: UseButtonEvents = {
    onMouseDown: () => {
      setPressed(true);
    },
    onMouseUp: () => {
      setPressed(false);
      setToggled((prev: boolean) => !prev);
    },
    onMouseLeave: () => {
      setPressed(false);
    },
  };
  return {
    toggled,
    pressed,
    css: pressed ? pressedCss : toggled ? onCss : offCss,
    events,
  };
};
