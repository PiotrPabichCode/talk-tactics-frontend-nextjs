import assert from 'assert';
import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

assert(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  'env variable not set: NEXT_PUBLIC_API_BASE_URL'
);

// function authRequestInterceptor(config: AxiosRequestConfig) {
//   if (!config.headers) {
//     config.headers = {};
//   }

//   return config;
// }

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export function authorizationInterceptor(
  internalAxiosRequestConfig: InternalAxiosRequestConfig
) {
  //   internalAxiosRequestConfig.headers.set(
  //     'your-header-key-here',
  //     'yourheader-value-here'
  //   );
  return internalAxiosRequestConfig;
}

axios.interceptors.request.use(authorizationInterceptor);
