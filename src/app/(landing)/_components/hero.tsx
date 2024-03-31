import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import getScrollAnimation from './getScrollAnimation';
import ScrollAnimationWrapper from './scroll-animation-wrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const Hero = ({
  listUser = [
    {
      name: 'Courses',
      number: '20',
      icon: '/hero-graduation-cap.svg',
    },
    {
      name: 'Unique Words',
      number: '2000',
      icon: '/hero-words.svg',
    },
    {
      name: 'Example usages',
      number: '10',
      icon: '/hero-examples.svg',
    },
  ],
}) => {
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
    <div className='max-w-screen-4xl px-8 xl:px-16 mx-auto' id='about'>
      <ScrollAnimationWrapper>
        <motion.div
          className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:py-8 xl:py-24'
          variants={scrollAnimation}>
          <div className=' flex flex-col justify-center items-start row-start-2 sm:row-start-1'>
            <h1 className='text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal'>
              Unlock the Power of English with <strong>TalkTactics</strong>.
            </h1>
            <p className='text-black-500 mt-4 mb-6'>
              Transform your aspirations into achievements — word by word.
            </p>
            <Link href={'/auth'}>
              <Button
                variant={'action'}
                className='bg-blue-500 hover:bg-blue-600'
                size={'lg'}>
                Begin now
              </Button>
            </Link>
          </div>
          <div className='flex w-full'>
            <Zoom>
              <motion.div className='h-full w-full' variants={scrollAnimation}>
                <img
                  className='border-2 shadow-2xl scale-100'
                  src={
                    theme === 'light'
                      ? '/preview-page-light.png'
                      : '/preview-page-dark.png'
                  }
                  alt='TalkTactics landing page'
                />
              </motion.div>
            </Zoom>
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10' />
      <ScrollAnimationWrapper>
        <div className='grid grid-cols-1 sm:grid-cols-3'>
          {listUser.map((listUsers, index) => (
            <motion.div
              className='flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0'
              key={index}
              custom={{ duration: 2 + index }}
              variants={scrollAnimation}>
              <div className='flex mx-auto w-40 sm:w-auto'>
                <div className='flex items-center justify-center bg-orange-100 w-12 h-12 mr-6 rounded-full'>
                  <img src={listUsers.icon} className='h-6 w-6' />
                </div>
                <div className='flex flex-col'>
                  <p className='text-xl text-black-600 font-bold'>
                    {listUsers.number}+
                  </p>
                  <p className='text-lg text-black-500'>{listUsers.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Hero;
