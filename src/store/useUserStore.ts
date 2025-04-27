import { create } from 'zustand';
import { logger } from './logger';
import { AuthUser } from '@/typings/user';

export interface UserStore extends AuthUser {
  isHydrated: boolean;
  isReady: boolean;
  setUserDetails: (details: Partial<AuthUser>) => void;
  finishHydration: () => void;
  clearUser: () => void;
  isUserReady: () => boolean;
  isUserHydrated: () => boolean;
}

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  bio: '',
};

const useUserStore = create<UserStore>()(
  logger<UserStore>((set, get) => ({
    ...initialState,
    isHydrated: false,
    isReady: false,
    setUserDetails(details) {
      set((state) => ({
        ...state,
        ...details,
        isReady: true,
        isHydrated: true,
      }));
    },
    finishHydration() {
      set(() => ({ isHydrated: true }));
    },
    clearUser() {
      set(() => ({
        ...initialState,
        isReady: false,
      }));
    },
    isUserReady() {
      return get().isReady;
    },
    isUserHydrated() {
      return get().isHydrated;
    },
  }))
);

export const useUserIsReady = () => useUserStore().isUserReady();
export const useUserIsHydrated = () => useUserStore().isUserHydrated();

export default useUserStore;
