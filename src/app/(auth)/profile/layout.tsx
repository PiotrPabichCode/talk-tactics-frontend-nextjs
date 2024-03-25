'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './_components/sidebar-nav';
import useUserStore from '@/store/useUserStore';
import withAuthRoles from '@/router/withAuthRoles';

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/profile',
  },
  {
    title: 'Preferences',
    href: '/profile/preferences',
  },
  {
    title: 'Courses',
    href: '/courses',
  },
];

interface ProfileLayoutSettings {
  children: React.ReactNode;
}

function ProfileLayout({ children }: ProfileLayoutSettings) {
  const { firstName } = useUserStore();
  return (
    <>
      <div className='space-y-6 p-10 pb-16 md:block'>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>{`👋 Hello ${firstName}`}</h2>
          <p className='text-muted-foreground'>
            Manage your account settings in here
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex-1 lg:max-w-2xl'>{children}</div>
        </div>
      </div>
    </>
  );
}

export default withAuthRoles(ProfileLayout, ['ADMIN', 'USER'], 'all');
