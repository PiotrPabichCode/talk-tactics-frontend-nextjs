import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Zoom from 'react-medium-image-zoom';
import PreviewLightMode from '../../../../../public/preview-light-mode.webp';
import PreviewDarkMode from '../../../../../public/preview-dark-mode.webp';
import 'react-medium-image-zoom/dist/styles.css';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function Modes() {
  const [ready, setReady] = useState(false);
  const theme = useTheme().theme;
  const t = useTranslations('LandingPage');

  useEffect(() => {
    if (theme) {
      setReady(true);
    }
  }, [theme]);

  if (!ready) {
    return null;
  }

  return (
    <div id='feature-modes'>
      <h3 className='text-center text-3xl lg:text-4xl pb-8'>{t('modes')}</h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='flex w-full'>
          <Zoom>
            <div className='h-full w-full'>
              <Image
                className='border-2 shadow-2xl'
                src={PreviewLightMode}
                alt='TalkTactics light mode'
              />
            </div>
          </Zoom>
        </div>
        <div className='flex w-full'>
          <Zoom>
            <div className='h-full w-full'>
              <Image
                className='border-2 shadow-2xl'
                src={PreviewDarkMode}
                alt='TalkTactics dark mode'
              />
            </div>
          </Zoom>
        </div>
      </div>
    </div>
  );
}
