export type IAuthRole = 'USER' | 'ADMIN';

export interface IAuthCredentials {
  uuid: string;
  username: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}

export interface IApiAuthCredentials {
  uuid: string;
  username: string;
  role: IAuthRole;
  token: string;
  refreshToken: string;
}
