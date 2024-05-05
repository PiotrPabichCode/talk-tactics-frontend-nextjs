import { Table } from '@/components/table/table';
import {
  CourseItemDto,
  ResponseGetUserCourseItemsPreview,
} from '@/typings/course';
import { filters } from './filters';
import { columns, userColumns } from './columns';

function UserCourseItemsMapper({
  userCourse,
}: {
  userCourse: ResponseGetUserCourseItemsPreview;
}) {
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
}

function CourseItemsMapper({ courseItems }: { courseItems: CourseItemDto[] }) {
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
}

export function CourseMapper({
  courseItems,
  userCourseMeta,
}: {
  courseItems: CourseItemDto[];
  userCourseMeta?: ResponseGetUserCourseItemsPreview;
}) {
  return userCourseMeta ? (
    <UserCourseItemsMapper userCourse={userCourseMeta} />
  ) : (
    <CourseItemsMapper courseItems={courseItems} />
  );
}
