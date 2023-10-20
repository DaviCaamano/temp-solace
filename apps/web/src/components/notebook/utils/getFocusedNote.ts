import { TreeNote } from '#interfaces/notes';

export const getFocusedNote = (
  focusedId: string | undefined | null = null,
  list: TreeNote[],
): {
  focused: TreeNote | undefined;
  list: TreeNote[];
} => {
  if (!focusedId) {
    return {
      focused: undefined,
      list: list,
    };
  }

  for (let focused of list) {
    if (focused.id === focusedId) {
      return {
        focused,
        list: focused.children || [],
      };
    }
    if (focused.children) {
      const inspectedChildren = getFocusedNote(focusedId, focused.children);
      if (inspectedChildren.focused) {
        return inspectedChildren;
      }
    }
  }
  return {
    focused: undefined,
    list: [],
  };
};
