'use client';
import useSettingsStore, { ISettingsStore } from '@/store/useSettingsStore';
import useStore from '@/store/useStore';
import { FontType } from '@/typings/settings';
import { Inter, Manrope, Montserrat } from 'next/font/google';
import { PropsWithChildren, useEffect } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap' });
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export default function FontLoader({ children }: PropsWithChildren) {
  const font = useStore<ISettingsStore, FontType>(
    useSettingsStore,
    (state) => state.font
  );

  const getCurrentFont = (font: FontType | undefined) => {
    switch (font) {
      case 'inter': {
        return inter.className;
      }
      case 'manrope': {
        return manrope.className;
      }
      case 'montserrat': {
        return montserrat.className;
      }
      default:
        return inter.className;
    }
  };

  useEffect(() => {
    if (!font) {
      return;
    }
    if (!useSettingsStore.persist.hasHydrated()) {
      useSettingsStore.persist.rehydrate();
    }
  }, [font]);

  return (
    <body className={`${getCurrentFont(font)} flex flex-col min-h-screen`}>
      {children}
    </body>
  );
}
