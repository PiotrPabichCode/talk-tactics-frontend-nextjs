'use client';

import {
  useGetCourseItemsPreviewByCourseId,
  useGetUserCourseItemsPreviewByCourseId,
} from '@/services/queries/course.query';
import { CoursePageSkeleton } from './_components/course-page-skeleton';
import { CourseMapper } from './_components/course-mapper';

export default function SingleCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = Number(params.courseId);
  const {
    data: courseItems,
    isPending: isCourseItemsPending,
    isError,
  } = useGetCourseItemsPreviewByCourseId(courseId);
  const {
    data: userCourseMeta,
    isPending: isUserCourseItemsPending,
    isError: userCourseError,
  } = useGetUserCourseItemsPreviewByCourseId({
    courseId: courseId,
  });

  if (isCourseItemsPending && isUserCourseItemsPending) {
    return <CoursePageSkeleton />;
  }
  if (isError && userCourseError) {
    return 'Something went wrong';
  }

  return (
    <div className='block lg:flex justify-center h-full'>
      <div className='w-full lg:w-[80%] xl:w-[65%] 2xl:w-[50%] overflow-scroll md:overflow-auto p-2 md:p-4'>
        <CourseMapper
          courseItems={courseItems}
          userCourseMeta={userCourseMeta}
        />
      </div>
    </div>
  );
}
