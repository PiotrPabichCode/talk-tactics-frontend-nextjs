import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCourseItemsPreviewByCourseId,
  getCourses,
} from '../api/course.service';
import { CourseDto, CourseItemDto } from '@/typings/course';

const QUERY_KEY = 'courses';
const COURSE_ITEMS_PREVIEW_QUERY_KEY = 'course_items_preview';

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

export function useGetCourseItemsPreviewByCourseId(courseId: string) {
  const queryClient = useQueryClient();
  const query = useQuery<CourseItemDto[], Error>({
    queryKey: [COURSE_ITEMS_PREVIEW_QUERY_KEY, courseId],
    queryFn: () => getCourseItemsPreviewByCourseId({ courseId }),
    initialData: () => {
      return queryClient.getQueryData([
        COURSE_ITEMS_PREVIEW_QUERY_KEY,
        courseId,
      ]) as CourseItemDto[];
    },
  });
  return query;
}
