'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { levels } from './data';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';
import { Course } from '@/typings/course';

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
      <DataTableColumnHeader column={column} title='Id' />
    ),
    cell: ({ row }) => <div className='w-[10px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ row }) => {
      return (
        <p className='max-w-[500px] truncate font-medium'>
          {row.getValue('title')}
        </p>
      );
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ row }) => {
      return (
        <p className='font-medium truncate xl:whitespace-normal'>
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
      <DataTableColumnHeader column={column} title='Words' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('courseItemsCount')}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
