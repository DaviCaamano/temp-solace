const { log: logger } = console;
/**
 * This function exists to help detecting console log entries that were left in the code unintentionally.
 * If something is intended to be logged please use this function.
 * Normal console log calls will be removed.
 */
export const log = (...args: any[]) => logger(...args);
