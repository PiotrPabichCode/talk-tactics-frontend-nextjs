import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export function Feature() {
  const [ready, setReady] = useState(false);
  const theme = useTheme().theme;

  useEffect(() => {
    if (theme) {
      setReady(true);
    }
  }, [theme]);

  if (!ready) {
    return null;
  }

  return (
    <div id='feature'>
      <h3 className='text-center text-4xl pb-8'>Light and Dark mode</h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='flex w-full'>
          <Zoom>
            <div className='h-full w-full'>
              <img
                className='border-2 shadow-2xl'
                src='/preview-light-mode.webp'
                alt='TalkTactics light mode'
              />
            </div>
          </Zoom>
        </div>
        <div className='flex w-full'>
          <Zoom>
            <div className='h-full w-full'>
              <img
                className='border-2 shadow-2xl'
                src='/preview-dark-mode.webp'
                alt='TalkTactics dark mode'
              />
            </div>
          </Zoom>
        </div>
      </div>
    </div>
  );
}
