'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './_components/sidebar-nav';
import withAuthRoles from '@/router/withAuthRoles';
import { useTranslations } from 'next-intl';
import { WelcomeMessage } from './_components/welcome-message';

interface ProfileLayoutSettings {
  children: React.ReactNode;
}

function ProfileLayout({ children }: ProfileLayoutSettings) {
  const t = useTranslations('UserProfile');

  const sidebarNavItems = [
    {
      title: t('profile'),
      href: '/profile',
    },
    {
      title: t('friends'),
      href: '/profile/friends',
    },
    {
      title: t('preferences'),
      href: '/profile/preferences',
    },
    {
      title: t('myCourses'),
      href: '/courses?custom=my-courses',
    },
  ];

  return (
    <>
      <div className='space-y-6 p-5 lg:p-10 pb-16 md:block'>
        <WelcomeMessage />
        <Separator
          className='my-6 animate-fade-up'
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside
            className='-mx-4 lg:w-1/5 animate-fade-up'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div
            className='flex-1 lg:max-w-2xl animate-fade-up'
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthRoles(ProfileLayout, ['ADMIN', 'USER'], 'all');
