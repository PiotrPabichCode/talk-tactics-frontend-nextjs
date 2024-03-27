'use client';

import { ColumnDef, Row } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { levels } from './data';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { CourseDto } from '@/typings/course';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpenText, Plus, Trash2 } from 'lucide-react';
import {
  useAddUserCourse,
  useDeleteUserCourse,
} from '@/services/queries/course.query';
import useAuthStore from '@/store/useAuthStore';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

function DeleteCourseDialog({
  isOpen,
  onOpenChange,
  onDelete,
}: {
  isOpen: boolean;
  onOpenChange: (_: boolean) => void;
  onDelete: () => void;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            course and remove your course data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const OpenCourseCell = ({ row }: { row: Row<CourseDto> }) => {
  return (
    <Link href={`/courses/${row.getValue('id')}`}>
      <Button variant={'action'}>
        Open course
        <BookOpenText className='h-4 w-4 ml-2' />
      </Button>
    </Link>
  );
};

const AddCourseCell = ({ row }: { row: Row<CourseDto> }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { isPending: isPendingAdd, mutateAsync: addCourse } =
    useAddUserCourse();
  const { isPending: isPendingDelete, mutateAsync: deleteCourse } =
    useDeleteUserCourse();
  const userId = useAuthStore().credentials?.id;
  if (!userId) {
    return;
  }

  const courseId: number = row.getValue('id');
  const progress: number = row.getValue('progress');

  const onDeleteCourse = async () => {
    try {
      await deleteCourse({ userId, courseId });
      toast.success('You have successfully deleted course.');
    } catch (e) {
      toast.error('Oh no! Something went wrong.', {
        description: 'There was a problem with your request',
      });
      console.error(e);
    }
  };

  const onAddCourse = async () => {
    try {
      await addCourse({ courseId: courseId, userId: userId });
      toast.success('You have successfully added new course!');
    } catch (e) {
      toast.error('Oh no! Something went wrong.', {
        description: 'There was a problem with your request',
      });
      console.error(e);
    }
  };

  const DeleteButton = () => {
    return (
      <Button
        disabled={isPendingDelete}
        onClick={() => setDeleteDialogOpen(true)}
        className='bg-red-500 hover:bg-red-600'
        variant={'action'}>
        Delete course <Trash2 className='h-4 w-4 ml-2' />
      </Button>
    );
  };

  const AddButton = () => {
    return (
      <Button
        disabled={isPendingAdd}
        onClick={onAddCourse}
        className='bg-green-500 hover:bg-green-600'
        variant={'action'}>
        Add course <Plus className='h-4 w-4 ml-2' />
      </Button>
    );
  };
  return progress !== undefined ? (
    <>
      <DeleteCourseDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onDelete={onDeleteCourse}
      />
      <DeleteButton />
    </>
  ) : (
    <AddButton />
  );
};

export const columns: ColumnDef<CourseDto>[] = [
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
    accessorKey: 'quantity',
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
            {row.getValue('quantity')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'progress',
    meta: {
      customName: 'Progress',
      auth: true,
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        className='w-[50px]'
        column={column}
        title='Progress'
      />
    ),
    cell: ({ row }) => {
      const progress = row.getValue('progress');
      if (progress === undefined) {
        return null;
      }
      return (
        <div className='flex justify-center items-center'>
          <span className='truncate font-medium'>{`${progress}%`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'addCourse',
    meta: {
      auth: true,
    },
    enableHiding: false,
    header: ({ column }) => null,
    cell: AddCourseCell,
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
