'use client';

import { CoursesPageSkeleton } from './_components/courses-page-skeleton';
import { courseSearchParamsCache } from './_lib/validations';
import { CoursesTable } from './_components/courses-table';
import { useGetCourses } from '@/services/queries/course/course.query';
import {useSearchParams} from "next/navigation";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const rawParams = Object.fromEntries(searchParams.entries());
  const search = courseSearchParamsCache.parse(rawParams);

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
