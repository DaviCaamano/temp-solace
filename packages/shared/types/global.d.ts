import { Dispatch, SetStateAction } from 'react';
declare global {
  /** State Setter for React and React like components */
  interface Setter<T> extends Dispatch<SetStateAction<T>> {}

  /** fetch */
  interface FetchResponse<T> extends Response {
    data: T;
  }

  type Tailwind = Record<string, string>;
}

interface ClipboardEvent extends Event {}
