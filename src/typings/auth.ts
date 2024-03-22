export type IAuthRole = 'USER' | 'ADMIN';

export interface IAuthDetails {
  id: string;
  username: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}
