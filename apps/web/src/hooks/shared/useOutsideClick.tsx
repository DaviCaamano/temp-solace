import { RefObject, useEffect, useRef } from 'react';

/**
 * Detects Clicks outside of the element equipped with the provided ref.
 * If any element that is not the element equipped with the provided ref or any element in the included parameter
 * the callback function will run.
 * @param callback - function : runs if a click occurs outside the element equipped with the ref returned by this hook.
 *      See 'included' fields to cancel to avoid executing the callback when other specific elements are clicks.
 * @param onEscape - function: runs when the user presses escape.
 * @param included - Ref Object or Array of Ref Objects: Cancels the callback if the click was on one of the elements
 *    equipped with the refs provided in this argument. It is considered part of the menu and thus does not close the
 *    menu
 */
export const useOuterClicks = (
  callback: () => void,
  onEscape: boolean = true,
  included?: RefObject<any>[] | RefObject<any>,
) => {
  const ref = useRef<HTMLElement>(null);
  // Handle clicks outside of chat
  useEffect(() => {
    function handleClickOutside(event: any) {
      //If included argument is defined, check to see if an included element was clicked and cancel the callback if so.
      let excludedElementClick = false;
      if (included) {
        if (Array.isArray(included)) {
          excludedElementClick = included.some((ref: RefObject<any>) => {
            return ref.current.contains(event.target);
          });
        } else {
          excludedElementClick = included.current?.contains(event.target);
        }
      }
      //If included elements were not clicked or were not defined
      //and the element equipped with the ref returned by this function was not clicked
      //Then run the callback
      if (!excludedElementClick && ref.current && !ref.current.contains(event.target)) {
        callback?.();
      }
    }

    // Close chat if esc key is hit
    function handleEsc(e: any) {
      if (onEscape && e.keyCode === 27) {
        callback?.();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [callback, included, onEscape, ref]);

  return ref;
};
