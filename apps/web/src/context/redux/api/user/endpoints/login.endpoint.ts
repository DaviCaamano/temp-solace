import { LoginResponse, NewUser, User } from '#interfaces/user';
import { HttpMethod } from '#interfaces/http';
import { transformErrorResponse } from '@utils/redux';
import { ReduxQueryBuilder } from '#interfaces/redux';
import { LoginDto } from '~user/dto';

export const loginEndpoint = (builder: ReduxQueryBuilder<'User' | 'Note'>) =>
  builder.mutation<User | null, LoginDto>({
    query: (user: NewUser) => ({
      url: '/user/login',
      method: HttpMethod.post,
      body: user,
    }),
    transformResponse: (resp: LoginResponse): User | null => {
      return resp?.user;
    },
    transformErrorResponse: transformErrorResponse,
    invalidatesTags: [{ type: 'User' }, { type: 'Note', id: 'LIST' }],
  });
