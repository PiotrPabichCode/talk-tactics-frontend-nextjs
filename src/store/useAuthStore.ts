import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from './logger';
import { IAuthCredentials } from '@/typings/auth';

export interface IAuthStore {
  credentials: IAuthCredentials | null;
  login: (credentials: IAuthCredentials) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  logger(
    persist(
      (set) => ({
        credentials: null,
        login(credentials) {
          set(() => ({
            credentials: credentials,
          }));
        },
        logout() {
          set(() => ({ credentials: null }));
        },
      }),
      {
        name: 'auth',
        skipHydration: true,
      }
    )
  )
);

export default useAuthStore;
