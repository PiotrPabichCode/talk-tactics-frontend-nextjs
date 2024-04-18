import { useUserIsReady } from '@/store/useUserStore';
import { Table } from '@tanstack/react-table';
import { useParams, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useMyCoursesFilter({ table }: { table: Table<any> }) {
  const isUserReady = useUserIsReady();
  const params = useParams();
  const myCourses = useSearchParams().get('filter')?.includes('my-courses');
  const [filterMyCourses, setFilterMyCourses] = useState<boolean>(false);

  useMemo(() => {
    if (!isUserReady) {
      return setFilterMyCourses(false);
    }
    setFilterMyCourses(!!myCourses);
  }, [myCourses, isUserReady, setFilterMyCourses]);

  useEffect(() => {
    if (Object.keys(params).length === 0) {
      table
        .getColumn('progress')
        ?.setFilterValue(filterMyCourses ? true : undefined);
    }
  }, [filterMyCourses]);

  return {
    filterMyCourses,
    setFilterMyCourses,
    isUserReady,
    params,
  };
}
