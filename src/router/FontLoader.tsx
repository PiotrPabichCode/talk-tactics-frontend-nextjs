'use client';
import useSettingsStore, { ISettingsStore } from '@/store/useSettingsStore';
import useStore from '@/store/useStore';
import { FontType } from '@/typings/settings';
import { Inter, Manrope, Montserrat } from 'next/font/google';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap' });
const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
});

export default function FontLoader() {
  const font = useStore<ISettingsStore, FontType>(
    useSettingsStore,
    (state) => state.font
  );
  const [currentFont, setCurrentFont] = useState<FontType | undefined>(
    undefined
  );

  const getFont = (font: FontType | undefined) => {
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
    const changeBodyFont = (font: FontType) => {
      if (currentFont) {
        document.body.classList.remove(getFont(currentFont));
      }
      const newFont = getFont(font);
      document.body.classList.add(newFont);
      setCurrentFont(font);
    };

    if (!font) {
      return;
    }
    changeBodyFont(font);
  }, [font, currentFont]);

  return null;
}
