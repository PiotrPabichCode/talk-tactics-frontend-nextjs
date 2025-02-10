'use client';

import { CoursePageSkeleton } from './_components/course-page-skeleton';
import { CourseMapper } from './_components/course-mapper';
import { useGetCourseItems } from '@/services/queries/course.query';

export default function SingleCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { isFetching, data: courseItems } = useGetCourseItems(
    Number(params.courseId)
  );

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
