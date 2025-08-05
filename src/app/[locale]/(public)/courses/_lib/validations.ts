import {
  parseAsInteger,
  parseAsString,
} from 'nuqs';

import { getFiltersStateParser, getSortingStateParser } from '@/lib/parsers';
import { CourseDto, CourseWordDto } from '@/typings/course';
import { ExtendedSortingState } from '@/types';
import {createSearchParamsCache} from "nuqs/server";

export const createGenericSearchParamsCache = <T>(
  defaultSort: ExtendedSortingState<T> = []
) =>
  createSearchParamsCache({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<T>().withDefault(defaultSort),
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
  createGenericSearchParamsCache<CourseDto>([]);
export type GetCoursesSchema = GetSearchParamsSchema<CourseDto>;

export const courseItemsSearchParamsCache =
  createGenericSearchParamsCache<CourseWordDto>([]);
export type GetCourseItemsSchema = GetSearchParamsSchema<CourseWordDto>;
