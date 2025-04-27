'use client';

import type { DataTableFilterField, DataTableRowAction } from '@/types';
import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useDataTable } from '@/hooks/use-data-table';
import { CourseWordDto } from '@/typings/course';
import { Page } from '@/typings/page.types';
import { useTranslations } from '@/i18n';
import { getColumns } from './course-items-table-columns';
import BackButton from './back-button';

interface CourseItemsTableProps {
  data: Page<CourseWordDto>;
}

export function CourseItemsTable({ data }: CourseItemsTableProps) {
  const { content, totalPages } = data;
  const t = useTranslations('Table');
  const columns = React.useMemo(() => getColumns(), []);
  const filterFields: DataTableFilterField<CourseWordDto>[] = [
    {
      id: 'search',
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
      sorting: [],
    },
    getRowId: (originalRow) => String(originalRow.uuid),
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable table={table}>
        <DataTableToolbar table={table} filterFields={filterFields}>
          <BackButton />
        </DataTableToolbar>
      </DataTable>
    </>
  );
}
