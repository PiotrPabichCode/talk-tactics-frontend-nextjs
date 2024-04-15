import { ColumnFiltersState } from '@tanstack/react-table';

export function getColumnFiltersUrl(filters: ColumnFiltersState) {
  let url = '';
  for (const filter of filters) {
    let columnId = filter.id;
    if (filter.id === 'level') {
      columnId = 'levels';
    }
    if (Array.isArray(filter.value)) {
      url += `&${columnId}=${filter.value.join(',')}`;
    } else {
      url += `&${columnId}=${filter.value}`;
    }
  }
  return url;
}
