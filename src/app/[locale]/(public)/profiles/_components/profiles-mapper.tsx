import React from 'react';
import { UserProfilePreview } from '@/typings/user';
import { ProfilesGrid } from './profiles-grid';

export function ProfilesMapper({
  profiles,
}: {
  profiles: UserProfilePreview[];
}) {
  const profileItems = profiles.map((profile) => {
    return {
      id: profile.uuid,
      title: profile.firstName + ' ' + profile.lastName,
      description: profile.bio,
      link: '/profiles/' + profile.uuid,
      points: profile.totalPoints,
    };
  });
  return <ProfilesGrid items={profileItems} />;
}
