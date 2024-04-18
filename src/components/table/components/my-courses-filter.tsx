import { Button } from '@/components/ui/button';
import { useMyCoursesFilter } from '../hooks/use-my-courses-filter';
import { Check } from 'lucide-react';
import { Table } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

export function MyCoursesFilter({ table }: { table: Table<any> }) {
  const { filterMyCourses, setFilterMyCourses, isUserReady, params } =
    useMyCoursesFilter({ table });
  return (
    isUserReady &&
    !params.courseId && (
      <Button
        onClick={() => {
          setFilterMyCourses(!filterMyCourses);
        }}
        variant='outline'
        size='sm'
        className={cn(
          'h-8 border-dashed',
          filterMyCourses && 'bg-green-500 hover:bg-green-600 border-none'
        )}>
        {filterMyCourses && <Check className='mr-2 h-4 w-4' />}
        My courses
      </Button>
    )
  );
}
