'use client';

import { ColumnDef, Row } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { CourseItemDto, UserCourseItemPreviewDto } from '@/typings/course';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Telescope } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLearnUserCourseItem } from '@/services/queries/course.query';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { GetLocalizedMessage, useTranslations } from '@/i18n';

const LearnMoreCell = ({ row }: { row: any }) => {
  const t = useTranslations('CoursePage');
  const pathname = usePathname();
  const courseItemId = row.original.courseItemId ?? row.getValue('id');
  return (
    <Link href={`${pathname}/words/${courseItemId}`}>
      <Button variant={'action'}>
        {t('learnMore')}
        <GraduationCap className='h-5 w-5 ml-2' />
      </Button>
    </Link>
  );
};

const SetLearnCell = ({ row }: { row: Row<UserCourseItemPreviewDto> }) => {
  const t = useTranslations('CoursePage');
  const {
    isPending,
    isSuccess,
    mutateAsync: learnWord,
  } = useLearnUserCourseItem();
  const learned = row.original.learned;

  const onSubmit = async () => {
    try {
      await learnWord(row.getValue('id'));
      toast.success(t('learnMoreSuccess'));
    } catch (e) {
      toast.error('Oh no! Something went wrong.', {
        description: 'There was a problem with your request',
      });
      console.error(e);
    }
  };

  return (
    <Button
      onClick={onSubmit}
      disabled={isPending || learned || isSuccess}
      className='bg-green-700 hover:bg-green-800'
      variant={'action'}>
      {isPending ? (
        <Spinner variant='button' />
      ) : (
        <>
          {learned || isSuccess ? t('iKnowIt') : t('gotThis')}
          <Telescope className='h-5 w-5 ml-2' />
        </>
      )}
    </Button>
  );
};

export const userColumns: ColumnDef<UserCourseItemPreviewDto>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[10px] text-center'
        column={column}
        title='CoursePage.position'
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
      <DataTableColumnHeader column={column} title='CoursePage.word' />
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
      <DataTableColumnHeader column={column} title='CoursePage.partOfSpeech' />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[100px] text-center font-medium truncate xl:whitespace-normal'>
          {row.getValue('partOfSpeech')}
        </p>
      );
    },
  },
  {
    accessorKey: 'phonetic',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CoursePage.phonetic' />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[200px] font-medium truncate xl:whitespace-normal'>
          {row.getValue('phonetic')
            ? row.getValue('phonetic')
            : GetLocalizedMessage('CoursePage.notAvailable')}
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
  {
    accessorKey: 'setLearned',
    enableHiding: false,
    meta: {
      auth: true,
    },
    header: ({ column }) => null,
    cell: SetLearnCell,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

export const columns: ColumnDef<CourseItemDto>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[10px] text-center'
        column={column}
        title='CoursePage.position'
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
      <DataTableColumnHeader column={column} title='CoursePage.word' />
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
      <DataTableColumnHeader column={column} title='CoursePage.partOfSpeech' />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[100px] text-center font-medium truncate xl:whitespace-normal'>
          {row.getValue('partOfSpeech')}
        </p>
      );
    },
  },
  {
    accessorKey: 'phonetic',
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CoursePage.phonetic' />
    ),
    cell: ({ row }) => {
      return (
        <p className='w-full max-w-[200px] font-medium truncate xl:whitespace-normal'>
          {row.getValue('phonetic')
            ? row.getValue('phonetic')
            : GetLocalizedMessage('CoursePage.notAvailable')}
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
