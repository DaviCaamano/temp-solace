import { useState } from 'react';
interface LinkButtonMouseover {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
export const useMouseOver = (): [boolean, LinkButtonMouseover] => {
  const [mousedOver, setMousedOver] = useState<boolean>(false);

  const events: LinkButtonMouseover = {
    onMouseEnter: () => {
      setMousedOver(true);
    },
    onMouseLeave: () => {
      setMousedOver(false);
    },
  };
  return [mousedOver, events];
};
