'use client';

import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { LinksNav } from './links-nav';
import { useGetCourses } from '@/services/queries/course.query';

export default function Header() {
  const { data: courses, isFetchedAfterMount } = useGetCourses();

  if (!isFetchedAfterMount) {
    return null;
  }
  return (
    <div className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20'>
      <nav className='h-[70px] flex items-center justify-between px-4'>
        <div className='hidden md:block'>
          <Link href={'/'}>
            <h1 className='text-2xl text-white'>TalkTactics</h1>
          </Link>
        </div>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar courses={courses} />
        </div>

        <div className='flex items-center gap-2'>
          <div className={cn('hidden me-5 md:block')}>
            <LinksNav courses={courses} header />
          </div>
          <UserNav />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
