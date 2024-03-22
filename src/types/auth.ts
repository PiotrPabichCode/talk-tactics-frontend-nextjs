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
