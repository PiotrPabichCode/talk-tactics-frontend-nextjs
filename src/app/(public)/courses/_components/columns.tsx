'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { levels } from './data';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { Course } from '@/typings/course';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpenText } from 'lucide-react';

const OpenCourseCell = ({ row }: { row: any }) => {
  return (
    <Link href={`/courses/${row.getValue('id')}`}>
      <Button variant={'action'}>
        Open course
        <BookOpenText className='h-4 w-4 ml-2' />
      </Button>
    </Link>
  );
};

export const columns: ColumnDef<Course>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader className='w-[10px]' column={column} title='No.' />
    ),
    cell: ({ row }) => <div className='w-[10px]'>{Number(row.id) + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {
      return (
        <p className='max-w-[500px]  text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
          {row.getValue('title')}
        </p>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='hidden md:block'
        column={column}
        title='Description'
      />
    ),
    cell: ({ row }) => {
      return (
        <p className='hidden md:block font-medium truncate xl:whitespace-normal'>
          {row.getValue('description')}
        </p>
      );
    },
  },
  {
    accessorKey: 'level',
    meta: {
      customName: 'Difficulty',
    },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Difficulty' />
    ),
    cell: ({ row }) => {
      const level = levels.find(
        (level) => level.value === row.getValue('level')
      );

      if (!level) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {level.icon && (
            <level.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{level.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'courseItemsCount',
    meta: {
      customName: 'Words',
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[50px]'
        column={column}
        title='Words'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex justify-center items-center'>
          <span className='truncate font-medium'>
            {row.getValue('courseItemsCount')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'openCourse',
    enableHiding: false,
    header: ({ column }) => null,
    cell: OpenCourseCell,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
