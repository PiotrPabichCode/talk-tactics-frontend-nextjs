import { create } from 'zustand';
import { logger } from './logger';

type Role = 'USER' | 'ADMIN';

interface IAuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface IAuthState {
  isAuthenticated: boolean;
  user: IAuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  actions: {
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    setAccessToken: (accessToken: string | null) => void;
    setRefreshToken: (refreshToken: string | null) => void;
    logout: () => void;
  };
}

const useAuthStore = create<IAuthState>()(
  logger<IAuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    role: 'USER',
    actions: {
      setIsAuthenticated(isAuthenticated) {
        set((state) => ({
          isAuthenticated,
        }));
      },
      setAccessToken(accessToken) {
        set((state) => ({
          accessToken,
        }));
      },
      setRefreshToken(refreshToken) {
        set((state) => ({
          refreshToken,
        }));
      },
      logout: () => {
        set(() => ({ refreshToken: null, accessToken: null }));
      },
    },
  }))
);

export default useAuthStore;
