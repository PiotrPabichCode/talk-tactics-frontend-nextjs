import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from 'nuqs/server';

import { getFiltersStateParser, getSortingStateParser } from '@/lib/parsers';
import { CourseDto, CourseItemDto } from '@/typings/course';
import { ExtendedSortingState } from '@/types';

export const createGenericSearchParamsCache = <T>(
  defaultSort: ExtendedSortingState<T> = []
) =>
  createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<T>().withDefault(defaultSort),
    title: parseAsString,
    search: parseAsString,
    filters: getFiltersStateParser().withDefault([]),
  });

export type GetSearchParamsSchema<T> = Omit<
  Awaited<
    ReturnType<ReturnType<typeof createGenericSearchParamsCache<T>>['parse']>
  >,
  'search'
> & {
  search: string | null;
};

export const courseSearchParamsCache =
  createGenericSearchParamsCache<CourseDto>([{ id: 'id', desc: false }]);
export type GetCoursesSchema = GetSearchParamsSchema<CourseDto>;

export const courseItemsSearchParamsCache =
  createGenericSearchParamsCache<CourseItemDto>([{ id: 'id', desc: false }]);
export type GetCourseItemsSchema = GetSearchParamsSchema<CourseItemDto>;
