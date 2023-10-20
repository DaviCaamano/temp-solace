import { Note, TreeNote } from '#interfaces/notes';

export const getNoteHierarchy = (original: Note[]): TreeNote[] => {
  const tree: TreeNote[] = [];

  for (let i = 0; i < original.length; i++) {
    const note = original[i];
    if (note.parentId === null) {
      const child: Note = original.splice(i, 1)[0];
      i--;
      tree.push({
        ...child,
        depth: 0,
      });
    }
  }

  return sortList(tree).map((root: TreeNote) => getChildren(original, root));
};

const getChildren = (original: (Note | TreeNote)[], parent: TreeNote): TreeNote => {
  if (!original.length) {
    return { ...parent, children: [] };
  }

  const children: TreeNote[] = [];
  /** Get Children of parent and remove them from the original array. */
  for (let i = 0; i < original.length; i++) {
    const note = original[i];
    if (note.parentId === parent.id) {
      const child: Note = original.splice(i, 1)[0];
      i--;
      children.push({
        ...child,
        depth: parent.depth + 1,
      });
    }
  }

  const sortedChildren = sortList(children).map((sortedChild: TreeNote) => getChildren(original, sortedChild));
  return {
    ...parent,
    children: sortedChildren,
  };
};

/** Sort the unsorted array of link list nodes, also add a prev field to make it a two-dimensional array */
const sortList = (list: TreeNote[], sorted: TreeNote[] = []) => {
  if (!list.length) {
    return sorted;
  }

  const unsorted = list.filter((note: TreeNote) => {
    if (!note.next) {
      sorted.push(note);
      return false;
    }
    for (let i = 0; i < sorted.length; i++) {
      const sortedNote = sorted[i];

      if (note.next === sortedNote.id) {
        /** Add prev field to previous head of list to make it a two-dimensional list */
        sorted[0].prev = note.id;
        /** prepend new head of list. */
        sorted.unshift({ ...note });
        return false;
      }
    }
    return true;
  });

  if (unsorted.length && unsorted.length !== list.length) {
    return sortList(unsorted, sorted);
  }
  return sorted;
};
