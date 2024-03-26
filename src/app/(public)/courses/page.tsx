'use client';

import { columns } from './_components/columns';
import { Table } from '@/components/table/table';
import { Spinner } from '@/components/ui/spinner';
import { filters } from './_components/filters';
import {
  useGetCourses,
  useGetUserCoursesPreviewByUserId,
} from '@/services/queries/course.query';
import useAuthStore from '@/store/useAuthStore';
import { CourseDto, UserCoursePreviewDto } from '@/typings/course';

export function combineCourses(
  courses: CourseDto[] = [],
  userCourses: UserCoursePreviewDto[] = []
): CourseDto[] {
  return courses.map((course) => {
    const userCourse = userCourses.find(
      (userCourse) => userCourse.courseId === course.id
    );
    if (userCourse) {
      return {
        ...course,
        progress: userCourse.progress,
        completed: userCourse.completed,
      };
    } else {
      return course;
    }
  });
}

export default function CoursesPage() {
  const userId = useAuthStore().credentials?.id;
  const { data: courses, isFetching, isError } = useGetCourses();
  const { data: userCourses, isFetching: isFetchingUserCourses } =
    useGetUserCoursesPreviewByUserId(userId);

  if (isFetching || isFetchingUserCourses) {
    return <Spinner />;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  const combinedCourses = combineCourses(courses, userCourses);

  return (
    <div className='w-screen h-full overflow-scroll md:overflow-auto p-2 md:p-4'>
      <Table data={combinedCourses} columns={columns} filters={filters} />
    </div>
  );
}
