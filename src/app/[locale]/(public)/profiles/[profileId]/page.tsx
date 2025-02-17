'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/ui/table';
import { Badge as UiBadge } from '@/components/ui/badge';
import { useGetUserProfile } from '@/services/queries/user.query';
import { LocalizeCourseLevel, UserCourse } from '@/typings/course';
import { use, useMemo } from 'react';
import { useTranslations } from '@/i18n';
import { Link, useRouter } from '@/navigation';
import { UserAvatar } from '@/components/user-avatar';

const countCompletedCourses = (courses: UserCourse[]) => {
  return courses.reduce((acc, course) => {
    if (course.completed) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const getBadgeName = (points: number): string => {
  let name = '';

  if (points < 1000) {
    name = 'Word Beginner';
  } else if (points < 2000) {
    name = 'Word Novice';
  } else if (points < 3000) {
    name = 'Word Intermediate';
  } else if (points < 4000) {
    name = 'Word Advanced';
  } else if (points < 5000) {
    name = 'Word Expert';
  } else {
    name = 'Word Master';
  }

  return name;
};

const Badge = ({ points }: { points: number }) => {
  const name = getBadgeName(points);

  return (
    <div className='flex justify-center lg:justify-start'>
      <UiBadge
        variant={'secondary'}
        className='px-4 text-2xl 2xl:text-3xl text-center lg:text-start font-medium bg-slate-800 text-zinc-200 pointer-events-none'>
        {name}
      </UiBadge>
    </div>
  );
};

export default function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const router = useRouter();
  const t = useTranslations('ProfilePage');
  const { profileId } = use(params);

  const {
    data: profile,
    isPending,
    isError,
  } = useGetUserProfile(Number(profileId));
  const completedCourses = useMemo(() => {
    if (!profile?.courses) {
      return 0;
    }
    return countCompletedCourses(profile.courses);
  }, [profile?.courses]);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{t('error')}</div>;
  }
  return (
    <div className='h-lvh overflow-scroll'>
      <div className='relative flex justify-center items-center w-full h-[60%] lg:pr-40'>
        <div
          className="absolute inset-0 bg-[url('/profile-bg.webp')] bg-cover bg-center bg-no-repeat brightness-50 animate-fade-in"
          style={{ animationDelay: '0.8s', animationFillMode: 'both' }}
        />
        <div className='flex flex-col lg:flex-row gap-5 items-center relative z-10'>
          <UserAvatar
            className='w-32 h-32 2xl:w-64 2xl:h-64 lg:mr-10 animate-fade-up bg-white'
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          />
          <div
            className='flex flex-col gap-2 animate-fade-up'
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h1 className='text-4xl 2xl:text-6xl font-bold text-zinc-200'>
              {profile.firstName + ' ' + profile.lastName}
            </h1>
            <Separator className='bg-slate-700' />
            <Badge points={profile.totalPoints} />
          </div>
        </div>
      </div>
      <Separator className='bg-slate-700' />
      <div
        className='flex flex-col lg:flex-row items-center justify-center p-8 gap-4 animate-fade-up'
        style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
        <div className='flex flex-col gap-2 max-w-[400px]'>
          <p className='text-2xl text-center font-semibold'>{t('about')}</p>
          <Separator />
          <p className='font-medium text-center font-serif'>{profile.bio}</p>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <div
          className='flex flex-col gap-2 w-full animate-fade-up'
          style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
          <p className='text-2xl text-center font-semibold'>{t('progress')}</p>
          <Separator />
          <p className='font-medium text-center font-serif'>
            {t('pointsWithScore', { points: profile.totalPoints })}
          </p>
          <p className='font-medium text-center font-serif'>
            {t('completed', { courses: completedCourses })}
          </p>
        </div>

        <div
          className='p-1 w-full lg:w-[1000px] max-w-6xl mb-2 animate-fade-up'
          style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('course')}</TableHead>
                <TableHead>{t('level')}</TableHead>
                <TableHead>{t('progress')}</TableHead>
                <TableHead>{t('points')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profile.courses.map((course) => (
                <TableRow
                  key={course.id}
                  className='cursor-pointer hover:text-blue-500'
                  onClick={() => router.push(`/courses/${course.id}`)}>
                  <TableCell>
                    <Link href={`/courses/${course.id}`}>{course.title}</Link>
                  </TableCell>

                  <TableCell>
                    <Link href={`/courses/${course.id}`}>
                      {LocalizeCourseLevel(course.level)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/courses/${course.id}`}>
                      {course.progress}%
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/courses/${course.id}`}>{course.points}</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
