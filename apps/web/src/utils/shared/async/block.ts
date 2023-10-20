/**
 * Function designed to be awaited for the purposes of waiting for unchainable async opperations like setState
 * @param seconds - Number of seconds to wait
 */
export const block = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), seconds * 1000);
  });
};
