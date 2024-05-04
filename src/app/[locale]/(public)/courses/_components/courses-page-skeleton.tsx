import { DataTableSkeleton } from '@/components/table/data-table-skeleton';

export function CoursesPageSkeleton() {
  return (
    <DataTableSkeleton
      columnCount={6}
      filterableColumnCount={2}
      searchableColumnCount={1}
      cellWidths={['4rem', '10rem', '30rem', '6rem', '10rem', '10rem']}
      shrinkZero
    />
  );
}
