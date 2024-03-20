import { type SignInBody, type SignUpBody } from '@/types/auth';
import { axios, setUserData } from '@/lib/axios';
import { IAuthUser } from '@/typings/user';

const ENDPOINT = 'auth';

export const signIn = async (credentials: SignInBody): Promise<IAuthUser> => {
  const { data } = await axios({
    method: 'POST',
    url: ENDPOINT + '/authenticate',
    data: credentials,
  });
  setUserData(data);
  return data;
};

const toSignUpDtoMapper = ({
  login,
  password,
  repeatPassword,
  firstName,
  lastName,
  email,
}: SignUpBody) => {
  return {
    login: login,
    password: password,
    repeat_password: repeatPassword,
    first_name: firstName,
    last_name: lastName,
    email: email,
  };
};

export const signUp = async (credentials: SignUpBody): Promise<IAuthUser> => {
  const { data } = await axios({
    method: 'POST',
    url: ENDPOINT + '/register',
    data: toSignUpDtoMapper(credentials),
  });
  setUserData(data);
  return data;
};
