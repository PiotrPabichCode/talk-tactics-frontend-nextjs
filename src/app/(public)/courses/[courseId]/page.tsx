'use client';

import { columns } from './_components/columns';
import { Table } from '@/components/table/table';
import { Spinner } from '@/components/ui/spinner';
import { useGetCourseItemsPreviewByCourseId } from '@/services/queries/course.query';
import { filters } from './_components/filters';

export default function SingleCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const { data: courseItems, isPending } = useGetCourseItemsPreviewByCourseId(
    params.courseId
  );
  if (isPending) {
    return <Spinner />;
  }
  console.log(courseItems);

  return (
    <div className='block lg:flex justify-center h-full'>
      <div className='w-full lg:w-[80%] xl:w-[60%] 2xl:w-[50%] overflow-scroll p-2 md:p-4'>
        <p className='text-xl font-bold text-center mb-4'>
          {courseItems[0].courseName}
        </p>
        <Table
          data={courseItems}
          filters={filters}
          columns={columns}
          viewOptions={false}
        />
      </div>
    </div>
  );
}
