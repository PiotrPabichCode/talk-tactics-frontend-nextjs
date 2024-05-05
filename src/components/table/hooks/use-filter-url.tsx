import { ColumnFiltersState } from '@tanstack/react-table';
import { useEffect } from 'react';

export function useFilterUrl({
  columnFilters,
}: {
  columnFilters: ColumnFiltersState;
}) {
  useEffect(() => {
    function updateFilteringUrl(filters: ColumnFiltersState) {
      const currentParams = new URLSearchParams(window.location.search);
      const params = new URLSearchParams();
      filters.forEach((filter) => {
        if (!filter.value) {
          return;
        }
        if (filter.id === 'progress') {
          params.set('custom', 'my-courses');
        } else if (Array.isArray(filter.value)) {
          const values = filter.value.join(',');
          params.set(filter.id, values);
        } else if (typeof filter.value === 'string') {
          params.set(filter.id, filter.value);
        }
      });
      if (currentParams.toString() === params.toString()) {
        return;
      }
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${params}`
      );
    }

    updateFilteringUrl(columnFilters);
  }, [columnFilters]);

  return null;
}
