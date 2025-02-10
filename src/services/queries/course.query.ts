import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addUserCourse,
  deleteUserCourse,
  getCourseItemById,
  getCourseItems,
  getCourses,
  getNavbarCourses,
  getUserCourses,
  learnUserCourseItem,
} from '../api/course.service';
import {
  ApiRequestAddUserCourse,
  ApiRequestDeleteUserCourse,
  CourseDto,
  CourseItem,
  CourseItemDto,
  CourseNavbarDto,
} from '@/typings/course';
import { useCoursesEmpty } from '@/store/useCourseStore';
import { Page } from '@/typings/page.types';

const QUERY_KEY = 'courses';
const COURSES_NAVBAR_QUERY_KEY = 'courses_navbar';
const USER_COURSE_ITEMS_PREVIEW_QUERY_KEY = 'user_course_items_preview';
const USER_COURSES_PREVIEW_QUERY_KEY = 'user_courses_preview';
const COURSE_ITEM_QUERY_KEY = 'course_item';
const DELETE_USER_COURSE_QUERY_KEY = 'delete_user_course';
const ADD_USER_COURSE_QUERY_KEY = 'add_user_course';
const LEARN_USER_COURSE_ITEM_QUERY_KEY = 'learn_user_course_item';

export function getQueryKey(page?: number) {
  if (page === undefined) {
    return [QUERY_KEY];
  }
  return [QUERY_KEY, page];
}

export function useGetCourses(page?: number) {
  const queryClient = useQueryClient();
  const enabled = useCoursesEmpty();
  const query = useQuery<Page<CourseDto>, Error>({
    queryKey: getQueryKey(page),
    queryFn: () => getCourses(),
    enabled: enabled,
    initialData: () => {
      return queryClient.getQueryData(getQueryKey()) as Page<CourseDto>;
    },
  });
  return query;
}

export function useGetNavbarCourses() {
  const queryClient = useQueryClient();
  const query = useQuery<CourseNavbarDto[], Error>({
    queryKey: [COURSES_NAVBAR_QUERY_KEY],
    queryFn: () => getNavbarCourses(),
    initialData: () => {
      return queryClient.getQueryData([
        COURSES_NAVBAR_QUERY_KEY,
      ]) as CourseNavbarDto[];
    },
  });
  return query;
}

export function useGetCourseItems(courseId: number) {
  const queryClient = useQueryClient();
  const query = useQuery<Page<CourseItemDto>, Error>({
    queryKey: ['course-items' + courseId],
    queryFn: () => getCourseItems({ courseId }),
    initialData: () => {
      return queryClient.getQueryData([
        'course-items' + courseId,
      ]) as Page<CourseItemDto>;
    },
  });
  return query;
}

export function useGetCourseItemById(id: number) {
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

export function useGetUserCoursesByUserId(userId?: number) {
  const enabled = !!userId;
  const queryClient = useQueryClient();
  const query = useQuery<CourseDto[], Error>({
    queryKey: [USER_COURSES_PREVIEW_QUERY_KEY, userId],
    queryFn: () => getUserCourses({ id: userId! }),
    staleTime: 0,
    enabled: enabled,
    initialData: () => {
      return queryClient.getQueryData([
        USER_COURSES_PREVIEW_QUERY_KEY,
        userId,
      ]) as CourseDto[];
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

export function useLearnUserCourseItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      return await learnUserCourseItem({ id });
    },
    onSuccess({ courseId }) {
      queryClient.invalidateQueries({
        queryKey: [USER_COURSE_ITEMS_PREVIEW_QUERY_KEY, courseId],
      });
      queryClient.invalidateQueries({
        queryKey: [USER_COURSES_PREVIEW_QUERY_KEY],
      });
    },
    mutationKey: [LEARN_USER_COURSE_ITEM_QUERY_KEY],
  });
}
