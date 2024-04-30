'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { GetLocalizedMessage, useTranslations } from '@/i18n';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const t = useTranslations('Table.DataTableViewOptions');
  const toggleColumns = table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== 'undefined' && column.getCanHide()
    );
  return (
    toggleColumns.length > 0 && (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            className='ml-auto hidden h-8 xl:flex'>
            <MixerHorizontalIcon className='mr-2 h-4 w-4' />
            {t('view')}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[150px]'>
          <DropdownMenuLabel>{t('toggleColumns')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {toggleColumns.map((column) => {
            const tag = column.columnDef.meta?.customName ?? column.id;
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                {GetLocalizedMessage(tag)}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
}
