import {
  toSignUpDtoMapper,
  type SignInBody,
  type SignUpBody,
} from '@/typings/auth';
import { axios } from '@/lib/axios';
import useAuthStore from '@/store/useAuthStore';
import useUserStore from '@/store/useUserStore';
import { UpdateUserDto } from '@/typings/user';

const AUTH_ENDPOINT = 'auth';
const USERS_ENDPOINT = 'users';

export const signIn = async (credentials: SignInBody): Promise<void> => {
  const { data } = await axios({
    method: 'POST',
    url: AUTH_ENDPOINT + '/authenticate',
    data: credentials,
  });

  // save auth details in local storage
  useAuthStore.getState().login(data);

  // fetch user details
  await getUserDetails({ username: data.username });
};

export const signUp = async (credentials: SignUpBody): Promise<void> => {
  const { data } = await axios({
    method: 'POST',
    url: AUTH_ENDPOINT + '/register',
    data: toSignUpDtoMapper(credentials),
  });
  // save auth details in local storage
  useAuthStore.getState().login(data);

  // fetch user details
  await getUserDetails({ username: data.username });
};

const fromUserDetailsResponseMapper = ({
  first_name,
  last_name,
  bio,
  email,
}: UserDetailsResponse) => {
  return {
    firstName: first_name,
    lastName: last_name,
    bio: bio,
    email: email,
  };
};

interface UserDetailsResponse {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
}

export const getUserDetails = async ({ username }: { username: string }) => {
  const { data } = await axios({
    method: 'GET',
    url: USERS_ENDPOINT + '/username/' + username,
  });
  useUserStore.getState().setUserDetails(fromUserDetailsResponseMapper(data));
};

export const updateUser = async ({
  id,
  updateUserDto,
}: {
  id: number;
  updateUserDto: Partial<UpdateUserDto>;
}) => {
  const { data } = await axios({
    method: 'PATCH',
    url: USERS_ENDPOINT + '/' + id,
    data: updateUserDto,
  });
  useUserStore.getState().setUserDetails(fromUserDetailsResponseMapper(data));
};
