import { axios } from '@/lib/axios';
import useAuthStore from '@/store/useAuthStore';
import useUserStore from '@/store/useUserStore';
import {
  ApiRequestSignIn,
  ApiRequestSignUp,
  ApiResponseAuthCredentials,
  toAuthResponseMapper,
  toSignUpRequestMapper,
} from '@/typings/auth';
import {
  ApiRequestGetUserDetails,
  ApiRequestUpdateUser,
  ApiResponseGetUserDetails,
  ApiResponseUpdateUser,
  toGetUserDetailsResponseMapper,
  toUpdateUserRequestMapper,
  toUpdateUserResponseMapper,
} from '@/typings/user';

const AUTH_ENDPOINT = 'auth';
const USERS_ENDPOINT = 'users';

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

export const getUserDetails = async ({
  username,
}: ApiRequestGetUserDetails) => {
  const { data } = await axios<ApiResponseGetUserDetails>({
    method: 'GET',
    url: USERS_ENDPOINT + '/username/' + username,
  });
  useUserStore.getState().setUserDetails(toGetUserDetailsResponseMapper(data));
};

export const updateUser = async ({
  id,
  updatedFields,
}: ApiRequestUpdateUser) => {
  const { data } = await axios<ApiResponseUpdateUser>({
    method: 'PATCH',
    url: USERS_ENDPOINT + '/id/' + id,
    data: toUpdateUserRequestMapper(updatedFields),
  });
  useUserStore.getState().setUserDetails(toUpdateUserResponseMapper(data));
};
