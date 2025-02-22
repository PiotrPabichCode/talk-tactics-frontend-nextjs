'use client';

import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { useGetUserProfile } from '@/services/queries/user.query';
import { UserCourse } from '@/typings/course';
import { use } from 'react';
import ProfileBio from './_components/profile-bio';
import Score from './_components/score';
import ProfileHeader from './_components/profile-header';
import ProfileTable from './_components/profile-table';

const countCompletedCourses = (courses: UserCourse[]) => {
  return courses.reduce((acc, course) => {
    if (course.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = use(params);

  const { data: profile, isFetching } = useGetUserProfile(Number(profileId));

  if (isFetching) {
    return <Spinner />;
  }

  console.log(profile);

  return (
    <div>
      <ProfileHeader
        firstName={profile.firstName}
        lastName={profile.lastName}
        totalPoints={profile.totalPoints}
      />
      <Separator className='bg-slate-700' />
      <ProfileBio bio={profile.bio} />
      <div className='flex flex-col items-center'>
        <Score
          totalPoints={profile.totalPoints}
          completedCourses={countCompletedCourses(profile.courses)}
        />

        <div
          className='p-1 w-full lg:w-[1000px] max-w-6xl mb-2 animate-fade-up'
          style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <ProfileTable courses={profile.courses} />
        </div>
      </div>
    </div>
  );
}
