export type IAuthRole = 'USER' | 'ADMIN';

export interface IAuthCredentials {
  id: string;
  username: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}
