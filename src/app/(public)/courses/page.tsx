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
import useCourseStore from '@/store/useCourseStore';

export default function CoursesPage() {
  const userId = useAuthStore().credentials?.id;
  const courses = useCourseStore().courses;
  const { isFetching, isError } = useGetCourses();
  const { isFetching: isFetchingUserCourses } =
    useGetUserCoursesPreviewByUserId(userId);

  if (isFetching || isFetchingUserCourses) {
    return <Spinner />;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }

  return (
    <div className='w-screen h-full overflow-scroll md:overflow-auto p-2 md:p-4'>
      <Table data={courses} columns={columns} filters={filters} />
    </div>
  );
}
