import { UserProfile, useUser as useAuthZeroUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useLoginMutation } from '@context/redux/api/user/user.slice';
import { User } from '#interfaces/user/user.interface';

interface useLoginResponse {
  isLoading: boolean;
  isLoggedOut: boolean;
  user: User | undefined;
}
export const useLogin = (processLogin: boolean = false): useLoginResponse => {
  const { user: authZeroUser, isLoading: authZeroIsLoading } = useAuthZeroUser();

  const [login, { data: user, isLoading, isSuccess }] = useLoginMutation?.({
    fixedCacheKey: 'login',
  });

  useEffect(() => {
    if (processLogin && authZeroUser && detectUserChange(user, authZeroUser)) {
      login({
        zeroId: authZeroUser.sub as string,
        email: authZeroUser.email as string,
        name: authZeroUser.name || undefined,
        nickname: authZeroUser.nickname || undefined,
        picture: authZeroUser.picture || undefined,
      }).unwrap();
    }
  }, [authZeroUser, login, processLogin, user]);

  // /** Null if it is not yet clear if the user has logged in with both authzero and the backend yet */
  // const userLoggedIn: boolean | null;

  return {
    isLoading: authZeroIsLoading || isLoading || !!(!user && authZeroUser),
    isLoggedOut: !authZeroUser && !authZeroIsLoading && !user && !isLoading,
    user: isSuccess ? (user as User) : undefined,
  };
};

const detectUserChange = (user?: User | null, authZeroUser?: UserProfile): boolean => {
  const validAuthZeroUser = authZeroUser?.email && authZeroUser?.sub;
  const userLoggedIn = validAuthZeroUser && !user;
  const userUpdated =
    user &&
    authZeroUser?.email &&
    (user.name !== authZeroUser.name ||
      user.email !== authZeroUser.email ||
      user.nickname !== authZeroUser.nickname ||
      user.picture !== authZeroUser.picture);
  return !!validAuthZeroUser && (userLoggedIn || !!userUpdated);
};
