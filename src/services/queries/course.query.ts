import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCourses } from '../api/course.service';
import { CourseDto } from '@/typings/course';

const QUERY_KEY = 'courses';

export function getQueryKey(page?: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page];
}

export function useGetCourses(page?: number) {
  const queryClient = useQueryClient();
  const query = useQuery<CourseDto[], Error>({
    queryKey: getQueryKey(page),
    queryFn: () => getCourses(),
    initialData: () => {
      return queryClient.getQueryData(getQueryKey()) as CourseDto[];
    },
    staleTime: Infinity,
  });
  return query;
}
