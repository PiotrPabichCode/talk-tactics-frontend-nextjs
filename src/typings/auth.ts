export type IAuthRole = 'USER' | 'ADMIN';

export interface IAuthCredentials {
  id: number;
  username: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}

export interface SignInBody {
  username: string;
  password: string;
}

export interface SignUpBody {
  username: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  email: string;
}

export const toSignUpDtoMapper = ({
  username,
  password,
  repeatPassword,
  firstName,
  lastName,
  email,
}: SignUpBody) => {
  return {
    username: username,
    password: password,
    repeat_password: repeatPassword,
    first_name: firstName,
    last_name: lastName,
    email: email,
  };
};
