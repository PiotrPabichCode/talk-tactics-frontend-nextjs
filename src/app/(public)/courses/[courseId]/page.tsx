'use client';

import { columns, userColumns } from './_components/columns';
import { Table } from '@/components/table/table';
import { Spinner } from '@/components/ui/spinner';
import {
  useGetCourseItemsPreviewByCourseId,
  useGetUserCourseItemsPreview,
} from '@/services/queries/course.query';
import { filters } from './_components/filters';
import useAuthStore from '@/store/useAuthStore';
import useCourseStore from '@/store/useCourseStore';

export default function SingleCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const {
    data: courseItems,
    isPending,
    isError,
  } = useGetCourseItemsPreviewByCourseId(params.courseId);
  const isUserCourse =
    useCourseStore().courses.findIndex(
      (course) =>
        course.id === Number(params.courseId) && course.progress !== undefined
    ) !== -1;
  const userId = useAuthStore().credentials?.id;
  const {
    data: userCourseItems,
    isPending: isUserCourseItemsPending,
    isError: isUserCourseItemsError,
  } = useGetUserCourseItemsPreview({
    courseId: Number(params.courseId),
    userId: userId!,
  });
  if (
    (isUserCourse && isUserCourseItemsPending) ||
    (!isUserCourse && isPending)
  ) {
    return <Spinner />;
  }
  if ((!isUserCourse && isError) || (isUserCourse && isUserCourseItemsError)) {
    return <p>Something went wrong...</p>;
  }

  return (
    <div className='block lg:flex justify-center h-full'>
      <div className='w-full lg:w-[80%] xl:w-[60%] 2xl:w-[50%] overflow-scroll md:overflow-auto p-2 md:p-4'>
        {isUserCourse ? (
          <>
            <p className='text-xl font-bold text-center mb-4'>
              {userCourseItems.courseName}
            </p>
            <Table
              data={userCourseItems.items}
              filters={filters}
              columns={userColumns}
              viewOptions={false}
            />
          </>
        ) : (
          <>
            <p className='text-xl font-bold text-center mb-4'>
              {courseItems[0].courseName}
            </p>
            <Table
              data={courseItems}
              filters={filters}
              columns={columns}
              viewOptions={false}
            />
          </>
        )}
      </div>
    </div>
  );
}
