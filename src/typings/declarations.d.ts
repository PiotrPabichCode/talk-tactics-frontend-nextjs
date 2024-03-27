import '@tanstack/react-table';
import { LucideIcon } from 'lucide-react';
declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    customName?: string;
    auth?: boolean;
  }
  interface TFilterOption {
    value: string;
    label: string;
    icon?:
      | ComponentType<{
          className?: string | undefined;
        }>
      | undefined;
  }
  interface TFilter {
    name: string;
    title: string;
    options: TFilterOption[];
  }
  interface TFilters {
    mainPlaceholder: string;
    filters: TFilter[];
  }
}
