import {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { axios } from '@/lib/axios';
import useAuthStore from '@/store/useAuthStore';

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
  const token = useAuthStore.getState().user?.token;
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
  const { user, logout, setUser } = useAuthStore.getState();

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
            login: user?.username,
            refreshToken: user?.refreshToken,
          },
        });
        setUser(newToken.data);
        const accessToken = user?.token;
        if (accessToken) {
          originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return axios(originalConfig);
      } catch (_error: any) {
        logout();
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
