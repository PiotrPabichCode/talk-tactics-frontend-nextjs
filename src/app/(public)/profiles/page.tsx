'use client';

import { Spinner } from '@/components/ui/spinner';
import { useGetUserProfilePreviews } from '@/services/queries/user.query';
import { ProfilesMapper } from './_components/ProfilesMapper';
import { Separator } from '@/components/ui/separator';

export default function ProfilesPage() {
  const { data: profiles, isPending, isError } = useGetUserProfilePreviews();

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error loading profiles</div>;
  }

  return (
    <div className='p-4 flex flex-col items-center'>
      <div className='max-w-4xl space-y-3'>
        <h1 className='text-2xl font-bold text-center mb-2'>
          All user profiles
        </h1>
        <Separator className='max-w-4xl' />
        <ProfilesMapper profiles={profiles} />
      </div>
    </div>
  );
}
