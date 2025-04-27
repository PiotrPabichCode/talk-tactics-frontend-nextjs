'use client';

import type { ColumnDef, Row } from '@tanstack/react-table';
import { GraduationCap } from 'lucide-react';
import * as React from 'react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Button } from '@/components/ui/button';

import { CourseWordDto } from '@/typings/course';
import { GetLocalizedMessage, useTranslations } from '@/i18n';
import { Link, usePathname } from '@/navigation';
import { DataTableRowAction } from '@/types';

const LearnMoreCell = ({ row }: { row: Row<CourseWordDto> }) => {
  const t = useTranslations('CoursePage');
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/words/${row.original.uuid}`}>
      <Button variant='action'>
        {t('learnMore')}
        <GraduationCap className='h-5 w-5 ml-2' />
      </Button>
    </Link>
  );
};

export function getColumns(): ColumnDef<CourseWordDto>[] {
  return [
    {
      accessorKey: 'search',
      enableColumnFilter: false,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'word',
      enableHiding: false,
      meta: {
        localizedName: 'CoursePage.word',
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={GetLocalizedMessage('CoursePage.word')}
        />
      ),
      cell: ({ row }) => (
        <p className='w-full max-w-[300px] text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
          {row.getValue('word')}
        </p>
      ),
    },
    {
      accessorKey: 'partOfSpeech',
      meta: {
        localizedName: 'CoursePage.partOfSpeech',
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={GetLocalizedMessage('CoursePage.partOfSpeech')}
        />
      ),
      cell: ({ row }) => (
        <p className='w-full max-w-[300px] text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
          {row.getValue('partOfSpeech')}
        </p>
      ),
    },
    {
      accessorKey: 'phonetic',
      meta: {
        localizedName: 'CoursePage.phonetic',
      },
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={GetLocalizedMessage('CoursePage.phonetic')}
        />
      ),
      cell: ({ row }) => (
        <p className='w-full max-w-[300px] text-zinc-800 dark:text-blue-400 truncate font-serif font-semibold'>
          {row.getValue('phonetic') ??
            GetLocalizedMessage('WordPage.notAvailable')}
        </p>
      ),
    },
    {
      accessorKey: 'openCourse',
      enableHiding: false,
      header: () => null,
      cell: LearnMoreCell,
    },
  ];
}
