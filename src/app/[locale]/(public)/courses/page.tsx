'use client';

import { use } from 'react';
import { useGetCourses } from '@/services/queries/course.query';
import { CoursesPageSkeleton } from './_components/courses-page-skeleton';
import { SearchParams } from '@/types';
import { courseSearchParamsCache } from './_lib/validations';
import { CoursesTable } from './_components/courses-table';

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

export default function CoursesPage(props: IndexPageProps) {
  const searchParams = use(props.searchParams);
  const search = courseSearchParamsCache.parse(searchParams);

  const { isFetching, data: courses } = useGetCourses({ searchParams: search });

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
