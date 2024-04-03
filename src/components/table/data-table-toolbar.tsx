'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table, TFilters } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Check, Undo2 } from 'lucide-react';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useAuthStore from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

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
  const userId = useAuthStore().credentials?.id;
  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;
  const params = useParams();
  const searchParams = useSearchParams();
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [filterMyCourses, setFilterMyCourses] = useState(
    searchParams.get('filter') === 'added' && !!userId
  );
  const backUrl = `/courses/${params.courseItemId ? params.courseId : ''}`;

  useEffect(() => {
    table
      .getColumn('progress')
      ?.setFilterValue(filterMyCourses ? true : undefined);
  }, [table, filterMyCourses]);

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
          {userId && !params.courseId && (
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
          )}
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
                setFilterMyCourses(false);
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
