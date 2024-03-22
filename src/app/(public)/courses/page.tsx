'use client';

import { useGetCourses } from '@/services/queries/course.query';
import { columns } from './_components/columns';
import { Table } from '@/components/table/table';
import { Spinner } from '@/components/ui/spinner';
import { filters } from './_components/filters';

export default function CoursesPage() {
  const { isPending, data: courses } = useGetCourses();
  if (isPending) {
    return <Spinner />;
  }

  return (
    <div className='w-screen h-full overflow-scroll p-1 md:p-4'>
      <Table data={courses} columns={columns} filters={filters} />
    </div>
  );
}
