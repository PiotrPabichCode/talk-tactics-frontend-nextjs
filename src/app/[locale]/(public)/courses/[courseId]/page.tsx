'use client';

import { CoursePageSkeleton } from './_components/course-page-skeleton';
import { use } from 'react';
import { SearchParams } from '@/types';
import { CourseItemsTable } from './_components/course-items-table';
import { courseItemsSearchParamsCache } from '../_lib/validations';
import { useGetCourseWords } from '@/services/queries/course/course.query';

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
  params: Promise<{ courseId: string }>;
}

export default function SingleCoursePage(props: IndexPageProps) {
  const searchParams = use(props.searchParams);
  const search = courseItemsSearchParamsCache.parse(searchParams);
  const { courseId } = use(props.params);
  const { isFetching, data: courseItems } = useGetCourseWords({
    courseUuid: courseId,
    searchParams: search,
  });

  if (isFetching) {
    return <CoursePageSkeleton />;
  }

  return (
    <div className='block lg:flex justify-center h-full'>
      <div
        className='w-full lg:w-[80%] xl:w-[65%] 2xl:w-[55%] overflow-scroll md:overflow-auto p-2 md:p-4 animate-fade-up'
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <CourseItemsTable data={courseItems} />
      </div>
    </div>
  );
}
