import { type SignInBody, type SignUpBody } from '@/types/auth';
import { axios } from '@/lib/axios';

const ENDPOINT = 'auth';

export const signIn = async (credentials: SignInBody) => {
  try {
    const response = await axios({
      method: 'POST',
      url: ENDPOINT + '/authenticate',
      data: credentials,
    });
    console.log('User signed in', response);
    return response;
  } catch (e) {
    console.error(e);
  }
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

export const signUp = async (credentials: SignUpBody) => {
  const response = await axios({
    method: 'POST',
    url: ENDPOINT + '/register',
    data: toSignUpDtoMapper(credentials),
  });
  console.log('User signed up', response);
  return response;
};
