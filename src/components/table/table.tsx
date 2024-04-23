'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  TFilters,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import useAuthStore from '@/store/useAuthStore';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filters?: TFilters;
  viewOptions?: boolean;
}

export function Table<TData, TValue>({
  columns,
  data,
  filters,
  viewOptions = true,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const userId = useAuthStore().credentials?.id;

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  React.useEffect(() => {
    function updateFilteringUrl(filters: ColumnFiltersState) {
      const currentParams = new URLSearchParams(window.location.search);
      const params = new URLSearchParams();
      filters.forEach((filter) => {
        if (!filter.value) {
          return;
        }
        if (filter.id === 'progress') {
          params.set('custom', 'my-courses');
        } else if (Array.isArray(filter.value)) {
          const values = filter.value.join(',');
          params.set(filter.id, values);
        } else if (typeof filter.value === 'string') {
          params.set(filter.id, filter.value);
        }
      });
      if (currentParams.toString() === params.toString()) {
        return;
      }
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params}`
      );
    }

    updateFilteringUrl(columnFilters);
  }, [columnFilters, window.location.search, window.location.pathname]);

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        filters={filters}
        viewOptions={viewOptions}
      />
      <div className='rounded-md border'>
        <UITable>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isAuth = header.column.columnDef.meta?.auth;
                    if (isAuth && !userId) {
                      return null;
                    }
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => {
                      const isAuth = cell.column.columnDef.meta?.auth;
                      if (isAuth && !userId) {
                        return null;
                      }
                      return (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </UITable>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
