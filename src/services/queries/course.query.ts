import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addUserCourse,
  deleteUserCourse,
  getCourseItemById,
  getCourseItemsPreviewByCourseId,
  getCourses,
  getUserCoursesPreviewByUserId,
} from '../api/course.service';
import {
  ApiRequestAddUserCourse,
  ApiRequestDeleteUserCourse,
  CourseDto,
  CourseItem,
  CourseItemDto,
  UserCoursePreviewDto,
} from '@/typings/course';

const QUERY_KEY = 'courses';
const COURSE_ITEMS_PREVIEW_QUERY_KEY = 'course_items_preview';
const USER_COURSES_PREVIEW_QUERY_KEY = 'user_courses_preview';
const COURSE_ITEM_QUERY_KEY = 'course_item';
const DELETE_USER_COURSE_QUERY_KEY = 'delete_user_course';
const ADD_USER_COURSE_QUERY_KEY = 'add_user_course';

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

export function useAddUserCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ApiRequestAddUserCourse) => {
      await addUserCourse(req);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [USER_COURSES_PREVIEW_QUERY_KEY],
      });
    },
    mutationKey: [ADD_USER_COURSE_QUERY_KEY],
  });
}

export function useDeleteUserCourse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (req: ApiRequestDeleteUserCourse) => {
      await deleteUserCourse(req);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [USER_COURSES_PREVIEW_QUERY_KEY],
      });
    },
    mutationKey: [DELETE_USER_COURSE_QUERY_KEY],
  });
}

export function useGetUserCoursesPreviewByUserId(userId?: number) {
  const queryClient = useQueryClient();
  const query = useQuery<UserCoursePreviewDto[], Error>({
    queryKey: [USER_COURSES_PREVIEW_QUERY_KEY],
    queryFn: () => getUserCoursesPreviewByUserId({ id: userId! }),
    enabled: !!userId,
    initialData: () => {
      return queryClient.getQueryData([
        USER_COURSES_PREVIEW_QUERY_KEY,
      ]) as UserCoursePreviewDto[];
    },
  });
  return query;
}
