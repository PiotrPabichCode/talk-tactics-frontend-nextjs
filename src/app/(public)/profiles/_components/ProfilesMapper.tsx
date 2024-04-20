import React from 'react';
import { IUserProfile } from '@/typings/user';
import { ProfilesGrid } from '@/app/(public)/profiles/_components/ProfilesGrid';

export function ProfilesMapper({ profiles }: { profiles: IUserProfile[] }) {
  const profileItems = profiles.map((profile) => {
    return {
      title: profile.fullName,
      description: profile.bio,
      link: '/profiles/' + profile.id,
      avatar: '/account-man.svg',
      points: profile.totalPoints,
    };
  });
  return <ProfilesGrid items={profileItems} />;
}
