'use client';

import { columns } from './_components/columns';
import { Table } from '@/components/table/table';
import { Spinner } from '@/components/ui/spinner';
import { filters } from './_components/filters';
import {
  useGetCourses,
  useGetUserCoursesByUserId,
} from '@/services/queries/course.query';
import useAuthStore from '@/store/useAuthStore';
import useCourseStore from '@/store/useCourseStore';
import { useSearchParams } from 'next/navigation';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

export default function CoursesPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: Number(useSearchParams().get('page')) || 0,
    pageSize: Number(useSearchParams().get('size')) || 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const userId = useAuthStore().credentials?.id;
  const { data, isFetching: isFetchingCourses } = useGetCourses(
    pagination,
    columnFilters
  );
  const { isFetching } = useGetUserCoursesByUserId(userId);

  const courses = useCourseStore().getCombinedCourses(
    pagination,
    columnFilters
  );

  if (isFetchingCourses || isFetching) {
    return <Spinner />;
  }

  return (
    <div className='w-screen h-full overflow-scroll md:overflow-auto p-2 md:p-4'>
      <Table
        data={courses}
        columns={columns}
        filters={filters}
        pageMeta={data.meta}
        pagination={pagination}
        onPaginationChange={setPagination}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
      />
    </div>
  );
}
