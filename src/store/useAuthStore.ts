import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from './logger';
import { IAuthUser } from '@/typings/user';

export interface IAuthStore {
  user: IAuthUser | null;
  setUser: (user: IAuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  logger(
    persist(
      (set) => ({
        user: null,
        setUser(user) {
          set(() => ({ user: user }));
        },
        logout() {
          set(() => ({ user: null }));
        },
      }),
      { name: 'auth' }
    )
  )
);

export default useAuthStore;
