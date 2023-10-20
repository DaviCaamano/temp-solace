import { loginEndpoint } from '@context/redux/api/user/endpoints';
import { apiSlice } from '@context/redux/api/api.slice';
import { ReduxQueryBuilder } from '#interfaces/redux';

type UserTags = 'User' | 'Note';
export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder: ReduxQueryBuilder<UserTags>) => ({
    login: loginEndpoint(builder),
  }),
});

export const { useLoginMutation } = userSlice;
