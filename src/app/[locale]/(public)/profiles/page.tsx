'use client';

import { useGetUserProfilePreviews } from '@/services/queries/user/user.query';
import { ProfilesMapper } from './_components/profiles-mapper';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from '@/i18n';
import { ProfilesPageSkeleton } from './_components/profiles-page-skeleton';

export default function ProfilesPage() {
  const t = useTranslations('ProfilesPage');
  const { data: profiles, isFetching } = useGetUserProfilePreviews();

  if (isFetching) {
    return <ProfilesPageSkeleton />;
  }

  return (
    <div className='p-4 flex flex-col items-center'>
      <div className='max-w-4xl space-y-3'>
        <h1
          className='text-2xl font-bold text-center mb-2 animate-fade-up'
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          {t('title')}
        </h1>
        <Separator
          className='max-w-4xl animate-fade-up'
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        />
        <div
          className='animate-fade-up'
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <ProfilesMapper profiles={profiles} />
        </div>
      </div>
    </div>
  );
}
