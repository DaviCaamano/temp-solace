'use client';

/** If anything but '0', manualBreakPoint will override the screen width */
const manualBreakPoint: number = 0;

const breakpoints = [0, 320, 480, 768, 1024, 1280, 1536];

export const responsive = <T>(values: T[]): T | undefined => {
  if (!values.length) {
    return undefined;
  }
  const screenWidth = manualBreakPoint === 0 ? window?.innerHeight || 0 : manualBreakPoint;

  let breakPointIndex = breakpoints.findIndex((breakPoint: number) => screenWidth < breakPoint);

  return breakPointIndex > values.length ? values[values.length - 1] : values[breakPointIndex];
};
