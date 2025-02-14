'use client';

import { columns } from './_components/columns';
import { Table } from '@/components/table/table';
import { filters } from './_components/filters';
import { useGetCourses } from '@/services/queries/course.query';
import { CoursesPageSkeleton } from './_components/courses-page-skeleton';

export default function CoursesPage() {
  const { isFetching, data: courses } = useGetCourses();

  if (isFetching) {
    return <CoursesPageSkeleton />;
  }

  return (
    <div
      className='h-full overflow-scroll md:overflow-auto p-2 md:p-4 animate-fade-up'
      style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
      <Table data={courses.content} columns={columns} filters={filters} />
    </div>
  );
}
