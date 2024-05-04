'use client';
import { Spinner } from '@/components/ui/spinner';
import { getUserCourses } from '@/services/api/course.service';
import { getUserDetails } from '@/services/api/user.service';
import useAuthStore, { IAuthStore } from '@/store/useAuthStore';
import useSettingsStore, { ISettingsStore } from '@/store/useSettingsStore';
import useStore from '@/store/useStore';
import useUserStore from '@/store/useUserStore';
import { PropsWithChildren, useEffect, useReducer, useState } from 'react';

const StoreHydration = ({ children }: PropsWithChildren) => {
  /**
   * Manual rehydrate store when available
   * @example https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
   */
  const authStore = useStore<IAuthStore, IAuthStore>(
    useAuthStore,
    (state) => state
  );
  const settingsStore = useStore<ISettingsStore, ISettingsStore>(
    useSettingsStore,
    (state) => state
  );
  const isHydrated =
    useAuthStore.persist.hasHydrated() &&
    useSettingsStore.persist.hasHydrated();

  useEffect(() => {
    if (!authStore) {
      return;
    }
    if (!useAuthStore.persist.hasHydrated()) {
      useAuthStore.persist.onFinishHydration(async (state) => {
        if (!state.credentials?.username) {
          useUserStore.getState().finishHydration();
        } else {
          await getUserCourses({
            id: state.credentials?.id,
          });
          await getUserDetails({
            username: state.credentials?.username,
          });
        }
      });
      useAuthStore.persist.rehydrate();
    }
  }, [authStore]);

  useEffect(() => {
    if (!settingsStore) {
      return;
    }
    if (!useSettingsStore.persist.hasHydrated()) {
      useSettingsStore.persist.rehydrate();
    }
  }, [settingsStore]);

  if (!isHydrated) {
    return null;
  }

  return <>{children}</>;
};

export default StoreHydration;
