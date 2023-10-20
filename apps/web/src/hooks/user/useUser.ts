import { useLoginMutation } from '@context/redux/api/user/user.slice';

export const useUser = () => {
  return useLoginMutation({
    fixedCacheKey: 'login',
  });
};
