'use client';
import { useEffect } from 'react';
import {
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { getCourses } from '@/api/courses';
import type { Page1 } from '@/typings/page.types';
import type { Course } from '@/api/courses.types';

const QUERY_KEY = 'courses';

export function getQueryKey(page?: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page];
}

export function useGetCourses(page: number) {
  const query = useQuery<Page1<Course>, Error>({
    queryKey: getQueryKey(page),
    queryFn: ({ signal }) => getCourses(page, { signal }),
    placeholderData: keepPreviousData,
  });

  // Prefetch next page
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery({
        queryKey: getQueryKey(page + 1),
        queryFn: ({ signal }) => getCourses(page + 1, { signal }),
      });
    }
  }, [query.data, page, queryClient]);
  return query;
}
