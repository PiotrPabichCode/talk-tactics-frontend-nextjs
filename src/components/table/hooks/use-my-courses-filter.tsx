import { useUserIsReady } from '@/store/useUserStore';
import { Table } from '@tanstack/react-table';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export function useMyCoursesFilter({ table }: { table: Table<any> }) {
  const isUserReady = useUserIsReady();
  const pathName = usePathname();
  const isCoursesPage = useMemo(() => pathName === '/courses', [pathName]);
  const myCourses = useSearchParams().get('custom') === 'my-courses';
  const [myCoursesFilter, setMyCoursesFilter] = useState<boolean>(false);

  if (!isUserReady || !isCoursesPage) {
    return {
      isEnabled: false,
      myCoursesFilter: false,
      onMyCoursesFilterChange: () => {},
    };
  }

  useMemo(() => {
    setMyCoursesFilter(myCourses);
  }, [myCourses]);

  useEffect(() => {
    table
      .getColumn('progress')
      ?.setFilterValue(myCoursesFilter ? true : undefined);
  }, [myCoursesFilter, table]);

  return {
    isEnabled: true,
    myCoursesFilter,
    onMyCoursesFilterChange: (value: boolean) => {
      setMyCoursesFilter(value);
    },
  };
}
