import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { axios, clearUserData } from '@/lib/axios';
import {
  getAuthRefreshToken,
  getAuthToken,
  getUsername,
  setUserData,
} from './axios';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const token = getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (err: AxiosError): Promise<void> => {
  const originalConfig: CustomInternalAxiosRequestConfig = err.config!;

  if (err.response) {
    if (err.response.status === 401 && !originalConfig?._retry) {
      try {
        console.log('Token expired - try refresh token');
        originalConfig._retry = true;

        // Request new token by passing refresh token
        const newToken = await axios({
          method: 'POST',
          url: '/auth/refresh-token',
          headers: originalConfig.headers,
          data: {
            login: getUsername(),
            refreshToken: getAuthRefreshToken(),
          },
        });
        setUserData(newToken.data);
        const accessToken = getAuthToken();
        if (accessToken) {
          originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return axios(originalConfig);
      } catch (_error: any) {
        clearUserData();
        console.log('Refresh token has expired. Login required');

        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }
    if (err.response.status === 403 && err.response.data) {
      return Promise.reject(err.response.data);
    }
  }
  return Promise.reject(err);
};
