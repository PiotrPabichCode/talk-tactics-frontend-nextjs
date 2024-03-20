import { create } from 'zustand';
import { logger } from './logger';
import { IAuthUser } from '@/typings/user';
import { clearUserData, getUserData } from '@/lib/axios';

interface IAuthState {
  user: IAuthUser | null;
  actions: {
    setUser: (user: IAuthUser) => void;
    logout: () => void;
  };
}

const useAuthStore = create<IAuthState>()(
  logger<IAuthState>((set) => ({
    user: getUserData(),
    actions: {
      setUser(user) {
        set(() => ({ user: user }));
      },
      logout: () => {
        clearUserData();
        set(() => ({ user: null }));
      },
    },
  }))
);

export default useAuthStore;
