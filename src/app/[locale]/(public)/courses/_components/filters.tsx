import { TFilters } from '@tanstack/react-table';
import { levels } from './data';

export const filters: TFilters = {
  mainPlaceholder: 'CoursesPage.mainFilterPlaceholder',
  mainFilter: 'title',
  filters: [
    {
      name: 'level',
      title: 'CoursesPage.difficulty',
      options: levels,
    },
  ],
};
