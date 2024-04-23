'use client';

import { columns, userColumns } from './_components/columns';
import { Table } from '@/components/table/table';
import { Spinner } from '@/components/ui/spinner';
import {
  useGetCourseItemsPreviewByCourseId,
  useGetUserCourseItemsPreviewByCourseId,
} from '@/services/queries/course.query';
import { filters } from './_components/filters';
import {
  CourseItemDto,
  ResponseGetUserCourseItemsPreview,
} from '@/typings/course';

const UserCourseItemsMapper = ({
  userCourse,
}: {
  userCourse: ResponseGetUserCourseItemsPreview;
}) => {
  return (
    userCourse && (
      <>
        <p
          className='text-xl font-bold text-center mb-4 animate-fade-up'
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          {userCourse.courseName}
        </p>
        <div
          className='animate-fade-up'
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <Table
            data={userCourse.items}
            filters={filters}
            columns={userColumns}
            viewOptions={false}
          />
        </div>
      </>
    )
  );
};

const CourseItemsMapper = ({
  courseItems,
}: {
  courseItems: CourseItemDto[];
}) => {
  return (
    courseItems && (
      <>
        <p
          className='text-xl font-bold text-center mb-4 animate-fade-up'
          style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
          {courseItems[0].courseName}
        </p>
        <div
          className='animate-fade-up'
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          <Table
            data={courseItems}
            filters={filters}
            columns={columns}
            viewOptions={false}
          />
        </div>
      </>
    )
  );
};

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
    return <Spinner />;
  }
  if (isError && userCourseError) {
    return 'Something went wrong';
  }

  console.log(userCourseMeta);

  return (
    <div className='block lg:flex justify-center h-full'>
      <div className='w-full lg:w-[80%] xl:w-[60%] 2xl:w-[50%] overflow-scroll md:overflow-auto p-2 md:p-4'>
        {userCourseMeta ? (
          <UserCourseItemsMapper userCourse={userCourseMeta} />
        ) : (
          <CourseItemsMapper courseItems={courseItems} />
        )}
      </div>
    </div>
  );
}
