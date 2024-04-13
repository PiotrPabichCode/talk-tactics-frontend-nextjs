import { create } from 'zustand';
import { logger } from './logger';
import { IAuthUser } from '@/typings/user';

export interface UserStore extends IAuthUser {
  loading: boolean;
  setUserDetails: (details: Partial<IAuthUser>) => void;
  setLoading: (val: boolean) => void;
  clearUser: () => void;
  isUserLoaded: () => boolean;
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
  loading: true,
};

const useUserStore = create<UserStore>()(
  logger<UserStore>((set, get) => ({
    ...initialState,
    setUserDetails(details) {
      set((state) => ({ ...state, ...details, loading: false }));
    },
    setLoading(val) {
      set(() => ({ loading: false }));
    },
    clearUser() {
      set(() => ({
        ...initialState,
        loading: false,
      }));
    },
    isUserLoaded() {
      return !get().loading;
    },
  }))
);

export const useUserLoading = () => useUserStore().isUserLoaded();

export default useUserStore;
