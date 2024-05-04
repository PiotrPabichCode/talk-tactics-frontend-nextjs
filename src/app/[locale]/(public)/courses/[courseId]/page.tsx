'use client';

import { columns, userColumns } from './_components/columns';
import { Table } from '@/components/table/table';
import {
  useGetCourseItemsPreviewByCourseId,
  useGetUserCourseItemsPreviewByCourseId,
} from '@/services/queries/course.query';
import { filters } from './_components/filters';
import {
  CourseItemDto,
  ResponseGetUserCourseItemsPreview,
} from '@/typings/course';
import { CoursePageSkeleton } from './_components/course-page-skeleton';

export function CourseMapper({
  courseItems,
  userCourseMeta: userCourseItems,
}: {
  courseItems: CourseItemDto[];
  userCourseMeta?: ResponseGetUserCourseItemsPreview;
}) {
  const title = userCourseItems
    ? userCourseItems.courseName
    : courseItems[0].courseName;
  return (
    <>
      <p
        className='text-xl font-bold text-center mb-4 animate-fade-up'
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        {title}
      </p>
      <div
        className='animate-fade-up'
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {userCourseItems ? (
          <Table
            data={userCourseItems.items}
            filters={filters}
            columns={userColumns}
            viewOptions={false}
          />
        ) : (
          <Table
            data={courseItems}
            filters={filters}
            columns={columns}
            viewOptions={false}
          />
        )}
      </div>
    </>
  );
}

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
      <div className='w-full lg:w-[80%] xl:w-[60%] 2xl:w-[50%] overflow-scroll md:overflow-auto p-2 md:p-4'>
        <CourseMapper
          userCourseMeta={userCourseMeta}
          courseItems={courseItems}
        />
      </div>
    </div>
  );
}
