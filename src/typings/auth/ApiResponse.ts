import { IApiAuthCredentials } from './auth';

export type ApiResponseAuthCredentials = IApiAuthCredentials;

export const toAuthResponseMapper = ({
  id,
  username,
  role,
  token,
  refreshToken,
}: ApiResponseAuthCredentials) => {
  return {
    id: id,
    username: username,
    role: role,
    token: token,
    refreshToken: refreshToken,
  };
};
