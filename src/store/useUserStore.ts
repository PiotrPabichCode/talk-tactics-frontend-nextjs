import { create } from 'zustand';
import { logger } from './logger';
import { IAuthUser } from '@/typings/user';

export interface UserStore extends IAuthUser {
  loading: boolean;
  setUserDetails: (details: Partial<IAuthUser>) => void;
  setLoading: (val: boolean) => void;
}

const useUserStore = create<UserStore>()(
  logger<UserStore>((set) => ({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    loading: true,
    setUserDetails(details) {
      set((state) => ({ ...state, ...details, loading: false }));
    },
    setLoading(val) {
      set(() => ({ loading: false }));
    },
  }))
);

export default useUserStore;
