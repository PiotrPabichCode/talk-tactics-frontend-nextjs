'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { WordMeaning } from '@/typings/course';

export const columns: ColumnDef<WordMeaning>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[10px] text-center'
        column={column}
        title='No.'
      />
    ),
    cell: ({ row }) => (
      <div className='w-[10px] text-center'>{Number(row.id) + 1}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'definition',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-center w-full max-w-[600px]'
        column={column}
        title='Definition'
      />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[600px] text-zinc-800 dark:text-blue-400 font-serif font-semibold'>
          {row.getValue('definition')}
        </p>
      );
    },
  },
  {
    accessorKey: 'example',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        className='justify-center w-full'
        column={column}
        title='Usage Example'
      />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full font-medium xl:whitespace-normal font-serif'>
          {row.getValue('example')
            ? `"${row.getValue('example')}"`
            : 'Not available :('}
        </p>
      );
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
