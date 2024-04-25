import React from 'react';
import { IUserProfilePreview } from '@/typings/user';
import { ProfilesGrid } from '@/app/(public)/profiles/_components/ProfilesGrid';

export function ProfilesMapper({
  profiles,
}: {
  profiles: IUserProfilePreview[];
}) {
  const profileItems = profiles.map((profile) => {
    return {
      id: profile.id,
      title: profile.firstName + ' ' + profile.lastName,
      description: profile.bio,
      link: '/profiles/' + profile.id,
      avatar: '/account-man.svg',
      points: profile.totalPoints,
    };
  });
  return <ProfilesGrid items={profileItems} />;
}
