type IAuthRole = 'USER' | 'ADMIN';

export interface IAuthUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}
