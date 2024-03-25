import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCourseItemById,
  getCourseItemsPreviewByCourseId,
  getCourses,
} from '../api/course.service';
import { CourseDto, CourseItem, CourseItemDto } from '@/typings/course';

const QUERY_KEY = 'courses';
const COURSE_ITEMS_PREVIEW_QUERY_KEY = 'course_items_preview';
const COURSE_ITEM_QUERY_KEY = 'course_item';

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

export function useGetCourseItemById(id: string) {
  const queryClient = useQueryClient();
  const query = useQuery<CourseItem, Error>({
    queryKey: [COURSE_ITEM_QUERY_KEY, id],
    queryFn: () => getCourseItemById({ id }),
    initialData: () => {
      return queryClient.getQueryData([
        COURSE_ITEM_QUERY_KEY,
        id,
      ]) as CourseItem;
    },
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
