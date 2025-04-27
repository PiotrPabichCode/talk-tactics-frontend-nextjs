import { axios } from '@/lib/axios';
import useAuthStore from '@/store/useAuthStore';
import {
  ApiRequestSignIn,
  ApiRequestSignUp,
  ApiResponseAuthCredentials,
} from '@/typings/auth';
import { getUserDetails } from './user.service';

const AUTH = '/auth';

export const signIn = async (req: ApiRequestSignIn) => {
  const { data } = await axios<ApiResponseAuthCredentials>({
    method: 'POST',
    url: `${AUTH}/authenticate`,
    data: req,
  });
  useAuthStore.getState().login(data);
  await getUserDetails(data.username);
};

export const signUp = async (req: ApiRequestSignUp) => {
  const { data } = await axios<ApiResponseAuthCredentials>({
    method: 'POST',
    url: `${AUTH}/register`,
    data: req,
  });
  useAuthStore.getState().login(data);
  await getUserDetails(data.username);
};
