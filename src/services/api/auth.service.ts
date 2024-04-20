import { axios } from '@/lib/axios';
import useAuthStore from '@/store/useAuthStore';
import {
  ApiRequestSignIn,
  ApiRequestSignUp,
  ApiResponseAuthCredentials,
  toAuthResponseMapper,
  toSignUpRequestMapper,
} from '@/typings/auth';
import { getUserDetails } from './user.service';

const AUTH_ENDPOINT = 'auth';

export const signIn = async (req: ApiRequestSignIn): Promise<void> => {
  const { data } = await axios<ApiResponseAuthCredentials>({
    method: 'POST',
    url: AUTH_ENDPOINT + '/authenticate',
    data: req,
  });
  const res = toAuthResponseMapper(data);

  // save auth details in local storage
  useAuthStore.getState().login(res);

  // fetch user details
  await getUserDetails({ username: res.username });
};

export const signUp = async (req: ApiRequestSignUp): Promise<void> => {
  const { data } = await axios<ApiResponseAuthCredentials>({
    method: 'POST',
    url: AUTH_ENDPOINT + '/register',
    data: toSignUpRequestMapper(req),
  });
  const res = toAuthResponseMapper(data);
  // save auth details in local storage
  useAuthStore.getState().login(res);

  // fetch user details
  await getUserDetails({ username: res.username });
};
