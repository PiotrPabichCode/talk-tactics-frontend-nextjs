'use client';

import { columns } from './_components/columns';
import { Table } from '@/components/table/table';
import { filters } from './_components/filters';
import {
  useGetCourses,
  useGetUserCoursesByUserId,
} from '@/services/queries/course.query';
import useAuthStore from '@/store/useAuthStore';
import useCourseStore from '@/store/useCourseStore';
import { CoursesPageSkeleton } from './_components/courses-page-skeleton';

export default function CoursesPage() {
  const userId = useAuthStore().credentials?.id;
  const { isFetching: isFetchingCourses } = useGetCourses();
  const { isFetching } = useGetUserCoursesByUserId(userId);
  const courses = useCourseStore().getCombinedCourses();

  if (isFetchingCourses || isFetching) {
    return <CoursesPageSkeleton />;
  }

  return (
    <div
      className='w-screen h-full overflow-scroll md:overflow-auto p-2 md:p-4 animate-fade-up'
      style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
      <Table data={courses} columns={columns} filters={filters} />
    </div>
  );
}
