import { useUserIsReady } from '@/store/useUserStore';
import { Table } from '@tanstack/react-table';
import { useSearchParams } from 'next/navigation';
import { usePathname } from '@/navigation';
import { useEffect, useMemo, useState } from 'react';

export function useMyCoursesFilter({ table }: { table: Table<any> }) {
  const isUserReady = useUserIsReady();
  const pathName = usePathname();
  const isCoursesPage = useMemo(() => pathName === '/courses', [pathName]);
  const myCourses = useSearchParams().get('custom') === 'my-courses';
  const [myCoursesFilter, setMyCoursesFilter] = useState<boolean>(false);

  useMemo(() => {
    if (isCoursesPage) {
      setMyCoursesFilter(myCourses);
    }
  }, [myCourses, isCoursesPage]);

  useEffect(() => {
    if (isCoursesPage) {
      table
        .getColumn('progress')
        ?.setFilterValue(myCoursesFilter ? true : undefined);
    }
  }, [myCoursesFilter, table, isCoursesPage]);

  if (!isUserReady || !isCoursesPage) {
    return {
      isEnabled: false,
      myCoursesFilter: false,
      onMyCoursesFilterChange: () => {},
    };
  }

  return {
    isEnabled: true,
    myCoursesFilter,
    onMyCoursesFilterChange: (value: boolean) => {
      setMyCoursesFilter(value);
    },
  };
}
