'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { CourseItemDto } from '@/typings/course';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap } from 'lucide-react';
import { usePathname } from 'next/navigation';

const LearnMoreCell = ({ row }: { row: any }) => {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${row.getValue('id')}`}>
      <Button variant={'action'}>
        Learn more
        <GraduationCap className='h-5 w-5 ml-2' />
      </Button>
    </Link>
  );
};

export const columns: ColumnDef<CourseItemDto>[] = [
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
    accessorKey: 'word',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Word' />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[300px] text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
          {row.getValue('word')}
        </p>
      );
    },
  },
  {
    accessorKey: 'partOfSpeech',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Part of speech' />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[100px] text-center text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
          {row.getValue('partOfSpeech')}
        </p>
      );
    },
  },
  {
    accessorKey: 'phonetic',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Phonetic' />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[200px] text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
          {row.getValue('phonetic')
            ? row.getValue('phonetic')
            : 'Not available'}
        </p>
      );
    },
  },
  {
    accessorKey: 'learnMore',
    enableHiding: false,
    header: ({ column }) => null,
    cell: LearnMoreCell,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
