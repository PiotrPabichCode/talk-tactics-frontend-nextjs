export interface SignInBody {
  login: string;
  password: string;
}

export interface SignUpBody {
  login: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  email: string;
}
