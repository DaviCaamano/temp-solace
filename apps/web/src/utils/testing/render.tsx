import { JSXElementConstructor, ReactElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render as renderTests } from '@testing-library/react';

// @ts-ignore
export const render = (jsx: ReactElement<any, string | JSXElementConstructor<any>>) => {
  return {
    user: userEvent.setup(),
    // Import `render` from the framework library of your choice.
    // See https://testing-library.com/docs/dom-testing-library/install#wrappers
    ...renderTests(jsx),
  } as any;
};
