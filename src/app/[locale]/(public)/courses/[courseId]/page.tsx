'use client';

import { CoursePageSkeleton } from './_components/course-page-skeleton';
import { CourseMapper } from './_components/course-mapper';
import { useGetCourseItems } from '@/services/queries/course.query';
import { use } from 'react';

export default function SingleCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params);
  const { isFetching, data: courseItems } = useGetCourseItems(Number(courseId));

  if (isFetching) {
    return <CoursePageSkeleton />;
  }

  return (
    <div className='block lg:flex justify-center h-full'>
      <div className='w-full lg:w-[80%] xl:w-[65%] 2xl:w-[50%] overflow-scroll md:overflow-auto p-2 md:p-4'>
        <CourseMapper courseItems={courseItems.content} />
      </div>
    </div>
  );
}
