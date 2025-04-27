'use client';

import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import UserNav from './user-nav';
import { ModeToggle } from './mode-toggle';
import { LinksNav } from './links-nav';
import Image from 'next/image';
import LocaleToggle from './locale-toggle';
import { Link } from '@/navigation';
import { useGetNavbarCourses } from '@/services/queries/course/course.query';

export function Header() {
  const { data: courses, isFetching } = useGetNavbarCourses();
  if (isFetching) {
    return null;
  }

  return (
    <div
      className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-50 animate-fade-in'
      style={{ animationFillMode: 'both', animationDelay: '0.3s' }}>
      <nav className='h-20 flex items-center justify-between lg:justify-center px-4 gap-4'>
        <div className='hidden lg:block'>
          <Link href={'/'} className='flex flex-row items-center'>
            <h1 className='text-2xl text-current font-bold'>TalkTactics</h1>
            <Image src={'/logo.svg'} alt='Logo icon' width={48} height={48} />
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar courses={courses} />
        </div>

        <div className={cn('hidden lg:block')}>
          <LinksNav courses={courses} header />
        </div>

        <div className='flex items-center gap-2'>
          <UserNav />
          <LocaleToggle />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
