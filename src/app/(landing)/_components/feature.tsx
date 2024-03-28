import { useEffect, useMemo, useState } from 'react';
import getScrollAnimation from './getScrollAnimation';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import ScrollAnimationWrapper from './scroll-animation-wrapper';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function Feature() {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
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
    <div
      className='max-w-screen-4xl px-8 xl:px-16 mx-auto pt-16 pb-8 gap-8'
      id='feature'>
      <ScrollAnimationWrapper>
        <motion.h3
          variants={scrollAnimation}
          className='text-center text-4xl pb-8'>
          Light and Dark mode
        </motion.h3>
        <motion.div
          className='grid grid-cols-1 lg:grid-cols-2 gap-8'
          variants={scrollAnimation}>
          <div className='flex w-full'>
            <Zoom>
              <motion.div className='h-full w-full' variants={scrollAnimation}>
                <img
                  className='border-2 shadow-2xl'
                  src='/preview-light-mode.png'
                  alt='TalkTactics light mode'
                />
              </motion.div>
            </Zoom>
          </div>
          <div className='flex w-full'>
            <Zoom>
              <motion.div className='h-full w-full' variants={scrollAnimation}>
                <img
                  className='border-2 shadow-2xl'
                  src='/preview-dark-mode.png'
                  alt='TalkTactics dark mode'
                />
              </motion.div>
            </Zoom>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
}
