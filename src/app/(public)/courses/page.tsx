'use client';

import { columns } from './_components/columns';
import { Table } from '@/components/table/table';
import { Spinner } from '@/components/ui/spinner';
import { filters } from './_components/filters';
import useCourseStore from '@/store/useCourseStore';

export default function CoursesPage() {
  const courses = useCourseStore().courses;
  if (courses.length === 0) {
    return <Spinner />;
  }

  return (
    <div className='w-screen h-full overflow-scroll p-1 md:p-4'>
      <Table data={courses} columns={columns} filters={filters} />
    </div>
  );
}
