import {
  Api,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  coreModuleName,
  createApi,
  fetchBaseQuery,
  reactHooksModuleName,
} from '@reduxjs/toolkit/query/react';

type ApiSlice = Api<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>,
  NonNullable<unknown>,
  'api',
  'Note' | 'User',
  typeof coreModuleName | typeof reactHooksModuleName
>;
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
export const apiSlice: ApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl + '/api/',
  }),
  tagTypes: ['Note', 'User'],
  endpoints: () => ({}),
});
