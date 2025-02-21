'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { WordMeaning } from '@/typings/course';
import { GetLocalizedMessage } from '@/i18n';

export const columns: ColumnDef<WordMeaning>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[10px] text-center'
        column={column}
        title='WordPage.position'
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
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-center w-full max-w-[600px]'
        column={column}
        title='WordPage.definition'
      />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full min-w-[250px] max-w-[600px] text-zinc-800 dark:text-blue-400 font-serif font-semibold'>
          {row.getValue('definition')}
        </p>
      );
    },
  },
  {
    accessorKey: 'example',
    enableHiding: false,
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader
        className='text-center w-full'
        column={column}
        title='WordPage.example'
      />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full min-w-[200px] font-medium xl:whitespace-normal font-serif'>
          {row.getValue('example')
            ? `"${row.getValue('example')}"`
            : GetLocalizedMessage('WordPage.notAvailable')}
        </p>
      );
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
