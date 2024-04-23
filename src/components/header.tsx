'use client';

import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import UserNav from './user-nav';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { LinksNav } from './links-nav';
import { useUserIsHydrated } from '@/store/useUserStore';
import { useGetNavbarCourses } from '@/services/queries/course.query';
import Image from 'next/image';

export function Header() {
  const { data: courses, isLoading: coursesLoading } = useGetNavbarCourses();
  const isUserHydrated = useUserIsHydrated();
  if (coursesLoading || !isUserHydrated) {
    return null;
  }
  return (
    <div className='fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-50'>
      <nav className='h-20 flex items-center justify-between md:justify-center px-4 gap-4'>
        <div className='hidden md:block'>
          <Link href={'/'} className='flex flex-row items-center'>
            <h1 className='text-2xl text-current font-bold'>TalkTactics</h1>
            <Image src={'/logo.svg'} alt='Logo icon' width={48} height={48} />
          </Link>
        </div>
        <div className={cn('block md:!hidden')}>
          <MobileSidebar courses={courses} />
        </div>

        <div className={cn('hidden md:block')}>
          <LinksNav courses={courses} header />
        </div>

        <div className='flex items-center gap-2'>
          <UserNav />
          <ModeToggle />
        </div>
      </nav>
    </div>
  );
}
