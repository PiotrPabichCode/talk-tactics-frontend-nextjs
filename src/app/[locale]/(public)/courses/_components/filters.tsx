import { TFilters } from '@tanstack/react-table';
import { SparkleIcon, SparklesIcon, WandIcon } from 'lucide-react';

export const filters: TFilters = {
  mainPlaceholder: 'Search titles...',
  mainFilter: 'title',
  filters: [
    {
      name: 'level',
      title: 'Difficulty',
      options: [
        {
          value: 'BEGINNER',
          label: 'Beginner',
          icon: SparkleIcon,
        },
        {
          value: 'INTERMEDIATE',
          label: 'Intermediate',
          icon: SparklesIcon,
        },
        {
          value: 'ADVANCED',
          label: 'Advanced',
          icon: WandIcon,
        },
      ],
    },
  ],
};
