'use client';

import { use } from 'react';
import { CoursesPageSkeleton } from './_components/courses-page-skeleton';
import { SearchParams } from '@/types';
import { courseSearchParamsCache } from './_lib/validations';
import { CoursesTable } from './_components/courses-table';
import { useGetCourses } from '@/services/queries/course/course.query';

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default function CoursesPage(props: IndexPageProps) {
  const searchParams = use(props.searchParams);
  console.log(searchParams);
  const search = courseSearchParamsCache.parse(searchParams);
  console.log('COURSES', search);
  const { isFetching, data: courses } = useGetCourses(search);

  if (isFetching) {
    return <CoursesPageSkeleton />;
  }

  return (
    <div
      className='h-full overflow-scroll md:overflow-auto p-2 md:p-4 animate-fade-up'
      style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
      <CoursesTable data={courses} />
    </div>
  );
}
