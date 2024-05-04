import { DataTableSkeleton } from '@/components/table/data-table-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export function CoursePageSkeleton() {
  return (
    <div className='block lg:flex justify-center h-full'>
      <div className='w-full lg:w-[80%] xl:w-[60%] 2xl:w-[50%] p-2 md:p-4'>
        <div className='flex flex-col items-center'>
          <Skeleton className='h-[24px] w-[200px] mb-4' />
          <div className='relative w-screen md:w-full'>
            <Skeleton className='absolute top-0 right-2 md:right-0 h-[35px] w-[45px] md:w-[150px]' />
            <DataTableSkeleton
              columnCount={5}
              filterableColumnCount={0}
              searchableColumnCount={1}
              showViewOptions={false}
              cellWidths={['4rem', '12rem', '8rem', '10rem', '8rem']}
              shrinkZero
            />
          </div>
        </div>
      </div>
    </div>
  );
}
