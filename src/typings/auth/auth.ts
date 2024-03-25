export type IAuthRole = 'USER' | 'ADMIN';

export interface IAuthCredentials {
  id: number;
  username: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}

export interface IApiAuthCredentials {
  id: number;
  username: string;
  role: IAuthRole;
  token: string;
  refresh_token: string;
}
