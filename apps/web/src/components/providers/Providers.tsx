import { UserProvider } from '@auth0/nextjs-auth0/client';
import { PropsWithChildren } from 'react';
import { ReduxProvider } from './Redux.provider';

/**
 * A collection of all providers for the sake of importing to test renders (and _app.tsx as well)
 */
export const Providers = ({ children }: PropsWithChildren) => (
  <UserProvider>
    <ReduxProvider>{children}</ReduxProvider>
  </UserProvider>
);
