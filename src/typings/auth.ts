export type IAuthRole = 'USER' | 'ADMIN';

export interface IAuthCredentials {
  id: number;
  username: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}
