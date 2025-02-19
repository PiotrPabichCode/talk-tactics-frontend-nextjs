'use client';

import type { DataTableFilterField, DataTableRowAction } from '@/types';
import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { CourseItemDto } from '@/typings/course';
import { Page } from '@/typings/page.types';
import { useTranslations } from '@/i18n';
import { getColumns } from './course-items-table-columns';

interface CourseItemsTableProps {
  data: Page<CourseItemDto>;
}

export function CourseItemsTable({ data }: CourseItemsTableProps) {
  const { content, totalPages } = data;
  const t = useTranslations('Table');

  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<CourseItemDto> | null>(null);

  const columns = React.useMemo(() => getColumns({ setRowAction }), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<CourseItemDto>[] = [
    {
      id: 'word',
      label: 'Search',
      placeholder: t('searchText'),
    },
  ];

  const { table } = useDataTable({
    data: content,
    columns,
    pageCount: totalPages,
    filterFields,
    initialState: {
      sorting: [{ id: 'id', desc: false }],
    },
    getRowId: (originalRow) => String(originalRow.id),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields} />
      </DataTable>
    </>
  );
}
