'use client';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './_components/sidebar-nav';
import useUserStore from '@/store/useUserStore';
import withAuthRoles from '@/router/withAuthRoles';
import { useTranslations } from 'next-intl';

interface ProfileLayoutSettings {
  children: React.ReactNode;
}

function ProfileLayout({ children }: ProfileLayoutSettings) {
  const { firstName } = useUserStore();
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
        <div className='space-y-0.5'>
          <h2
            className='text-2xl font-bold tracking-tight animate-fade-up'
            style={{
              animationDelay: '0.1s',
              animationFillMode: 'both',
            }}>
            {t('welcome', {
              name: firstName,
            })}
          </h2>
          <p
            className='text-muted-foreground animate-fade-up'
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            {t('description')}
          </p>
        </div>
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
