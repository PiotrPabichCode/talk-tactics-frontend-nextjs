import { create } from 'zustand';
import { logger } from './logger';
import { IAuthUser } from '@/typings/user';

export interface UserStore extends IAuthUser {
  setUserDetails: (details: Partial<IAuthUser>) => void;
}

const useUserStore = create<UserStore>()(
  logger<UserStore>((set) => ({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    setUserDetails(details) {
      set((state) => ({ ...state, ...details }));
    },
  }))
);

export default useUserStore;
