import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logger } from './logger';
import { FontType } from '@/typings/settings';

export interface ISettingsStore {
  font: FontType;
  changeFont: (newFont: FontType) => void;
}

export const useSettingsStore = create<ISettingsStore>()(
  logger(
    persist(
      (set) => ({
        font: 'inter',
        changeFont(font) {
          set(() => ({
            font: font,
          }));
        },
      }),
      {
        name: 'settings',
        skipHydration: true,
      }
    )
  )
);

export default useSettingsStore;
