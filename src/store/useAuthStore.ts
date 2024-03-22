import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from './logger';
import { IAuthDetails as IAuthCredentials } from '@/typings/auth';

export interface IAuthStore {
  credentials: IAuthCredentials | null;
  setCredentials: (credentials: IAuthCredentials) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  logger(
    persist(
      (set) => ({
        credentials: null,
        setCredentials(credentials) {
          set(() => ({ credentials: credentials }));
        },
        logout() {
          set(() => ({ credentials: null }));
        },
      }),
      { name: 'auth' }
    )
  )
);

export default useAuthStore;
