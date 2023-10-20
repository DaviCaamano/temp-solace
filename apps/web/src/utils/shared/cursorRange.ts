export const cursorRange = (element: Node, startRange: number, endRange: number) => {
  const range = document.createRange();
  range.setStart(element, startRange); // to set the range
  range.setEnd(element, endRange);
};
