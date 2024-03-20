import assert from 'assert';
import Axios from 'axios';
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';
import { getItem, removeItem, setItem } from './localStorage';
import { IAuthUser } from '@/typings/user';

assert(
  process.env.NEXT_PUBLIC_API_BASE_URL,
  'env variable not set: NEXT_PUBLIC_API_BASE_URL'
);

export const setUserData = (user: IAuthUser) => {
  return setItem('user_data', user);
};

export const getUserData = () => {
  return getItem<IAuthUser>('user_data');
};

export const clearUserData = () => {
  removeItem('user_data');
};

export const getUserID = () => {
  return getUserData()?.id;
};

export const getAuthToken = () => {
  return getUserData()?.token;
};

export const getAuthRefreshToken = () => {
  return getUserData()?.refreshToken;
};

export const getUserRole = () => {
  return getUserData()?.role;
};

export const getUsername = () => {
  return getUserData()?.username;
};

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(requestInterceptor);

axios.interceptors.response.use(successInterceptor, errorInterceptor);

export { axios };
