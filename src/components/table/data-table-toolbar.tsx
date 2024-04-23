'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table, TFilters } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Undo2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useMyCoursesFilter } from './hooks/use-my-courses-filter';
import { MyCoursesFilter } from './components/my-courses-filter';
import { useParams } from 'next/navigation';
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filters?: TFilters;
  viewOptions: boolean;
}

export function DataTableToolbar<TData>({
  table,
  filters: settings,
  viewOptions,
}: DataTableToolbarProps<TData>) {
  const { isEnabled, myCoursesFilter, onMyCoursesFilterChange } =
    useMyCoursesFilter({
      table,
    });
  const params = useParams();
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const backUrl = `/courses/${params.courseItemId ? params.courseId : ''}`;

  return (
    <div className='flex items-center justify-between overflow-scroll md:overflow-auto'>
      {settings && (
        <div className='flex flex-1 items-center space-x-2'>
          <Input
            placeholder={settings.mainPlaceholder}
            value={globalFilter}
            onChange={(event) => {
              setGlobalFilter(event.target.value);
              table.setGlobalFilter(event.target.value);
            }}
            className='h-8 w-[150px] lg:w-[250px]'
          />
          <MyCoursesFilter
            isEnabled={isEnabled}
            isActive={myCoursesFilter}
            onChange={onMyCoursesFilterChange}
          />
          {settings.filters?.map(
            (filter) =>
              table.getColumn(filter.name) && (
                <DataTableFacetedFilter
                  key={'filter' + filter.name}
                  column={table.getColumn(filter.name)}
                  title={filter.title}
                  options={filter.options}
                />
              )
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => {
                table.resetColumnFilters();
                table.resetGlobalFilter();
                setGlobalFilter('');
                onMyCoursesFilterChange(false);
              }}
              className='h-8 px-2 lg:px-3'>
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      )}
      {viewOptions && <DataTableViewOptions table={table} />}
      {params.courseId && !params.courseItemId && (
        <Link href={backUrl} className='ml-auto'>
          <Button variant={'action'}>
            <p className='hidden md:block md:mr-2'>Back</p>
            <Undo2 className='h-4 w-4' />
          </Button>
        </Link>
      )}
    </div>
  );
}
