'use client';

import type { ColumnDef, Row } from '@tanstack/react-table';
import { BookOpenText } from 'lucide-react';
import * as React from 'react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';

import { CourseDto } from '@/typings/course';
import { GetLocalizedMessage, useTranslations } from '@/i18n';
import { levels } from './data';
import { Link } from '@/navigation';

const OpenCourseCell = ({ row }: { row: Row<CourseDto> }) => {
  const t = useTranslations('CoursesPage');
  return (
    <Link href={`/courses/${row.original.uuid}`}>
      <Button variant={'action'}>
        {t('openCourse')}
        <BookOpenText className='h-4 w-4 ml-2' />
      </Button>
    </Link>
  );
};

export function getColumns(): ColumnDef<CourseDto>[] {
  return [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader
          className='w-[10px] text-center'
          column={column}
          title={GetLocalizedMessage('CoursesPage.position')}
        />
      ),
      cell: ({ row }) => (
        <div className='w-[10px] text-center'>{Number(row.index) + 1}.</div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'search',
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      enableHiding: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={GetLocalizedMessage('CoursesPage.title')}
        />
      ),
      cell: ({ row }) => {
        return (
          <p className='max-w-[31.25rem] text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
            {row.getValue('title')}
          </p>
        );
      },
    },
    {
      accessorKey: 'description',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={GetLocalizedMessage('CoursesPage.description')}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex space-x-2'>
            <span className='max-w-[40.25rem] truncate font-medium'>
              {row.getValue('description')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'level',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={GetLocalizedMessage('CoursesPage.difficulty')}
        />
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
            <span>{GetLocalizedMessage(level.label)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={GetLocalizedMessage('CoursesPage.words')}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex space-x-2'>
            <span className='max-w-[31.25rem] truncate font-medium'>
              {row.getValue('quantity')}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'openCourse',
      enableHiding: false,
      header: () => null,
      cell: OpenCourseCell,
    },
  ];
}
