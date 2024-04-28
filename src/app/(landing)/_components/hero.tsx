import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import PreviewLightMode from '../../../../public/preview-light-mode.webp';
import PreviewDarkMode from '../../../../public/preview-dark-mode.webp';
import Image from 'next/image';
import useAuthStore, { userId } from '@/store/useAuthStore';

export function Hero({
  testimonials = [
    {
      name: 'Courses',
      number: '50',
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
}) {
  const [ready, setReady] = useState(false);
  const user = useAuthStore().credentials?.id;
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
    <>
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10' />
      <div
        id='about'
        className='lg:h-[calc(100vh-5rem)] flex flex-col lg:justify-around animate-fade-up mb-10'
        style={{
          animationDelay: '0.20s',
          animationFillMode: 'backwards',
        }}>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:pb-0 mb-4'>
          <div className='flex flex-col justify-center items-start row-start-2 sm:row-start-1'>
            <h1
              className='text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal animate-fade-up'
              style={{ animationDelay: '0.10s', animationFillMode: 'both' }}>
              Unlock the Power of English with <strong>TalkTactics</strong>.
            </h1>
            <p
              className='text-black-500 mt-4 mb-6 animate-fade-up'
              style={{ animationDelay: '0.20s', animationFillMode: 'both' }}>
              Transform your aspirations into achievements — word by word.
            </p>
            {!user && (
              <Link href={'/auth'}>
                <Button
                  variant={'action'}
                  className='bg-blue-500 hover:bg-blue-600 animate-fade-up'
                  style={{ animationDelay: '0.30s', animationFillMode: 'both' }}
                  size={'lg'}>
                  Begin now
                </Button>
              </Link>
            )}
          </div>
          <div
            className='flex w-full animate-fade-up'
            style={{ animationDelay: '0.30s', animationFillMode: 'both' }}>
            <Zoom>
              <div className='h-full w-full'>
                <Image
                  className='border-2 shadow-2xl object-cover'
                  src={theme === 'light' ? PreviewLightMode : PreviewDarkMode}
                  alt='TalkTactics landing page'
                />
              </div>
            </Zoom>
          </div>
        </div>

        <div
          className='grid grid-cols-1 sm:grid-cols-3 w-max md:w-full mx-auto md:mx-0 animate-fade-up'
          style={{ animationDelay: '0.40s', animationFillMode: 'both' }}>
          {testimonials.map((testimonial, index) => (
            <div className='py-4 sm:py-0' key={index}>
              <div className='flex md:justify-center sm:w-auto w-full'>
                <div className='flex items-center justify-center bg-orange-100 w-[48px] h-[48px] mr-6 rounded-full'>
                  <img
                    alt={`hero-icon${index}`}
                    src={testimonial.icon}
                    className='h-[24px] w-[24px]'
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='text-md md:text-xl text-black-600 font-bold'>
                    {testimonial.number}+
                  </p>
                  <p className='text-sm lg:text-lg text-black-500'>
                    {testimonial.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
