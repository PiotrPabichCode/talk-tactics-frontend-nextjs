import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getCourseWordByUuid,
  getCourseWords,
  getCourses,
  getNavbarCourses,
} from '../../api/course.service';
import {
  ApiResponseGetCourses,
  ApiResponseGetNavbarCourses,
  ApiResponseGetCourseWords,
  ApiResponseGetCourseWord,
} from '@/typings/course';
import {
  GetCourseItemsSchema,
  GetCoursesSchema,
} from '@/app/[locale]/(public)/courses/_lib/validations';

export const COURSES = 'courses';
export const COURSES_NAVBAR_QUERY_KEY = 'coursesNavbar';
export const COURSE_PARTICIPANT_WORDS_PREVIEW_QUERY_KEY =
  'courseParticipantWordsPreview';
export const COURSE_PARTICIPANTS_PREVIEW_QUERY_KEY =
  'courseParticipantsPreview';
export const COURSE_WORDS_QUERY_KEY = 'courseWords';

export function useGetCourses(searchParams: GetCoursesSchema) {
  const queryClient = useQueryClient();
  const query = useQuery<ApiResponseGetCourses, Error>({
    queryKey: [COURSES + JSON.stringify(searchParams)],
    queryFn: () => getCourses({ searchParams }),
    initialData: () => {
      return queryClient.getQueryData([
        COURSES + JSON.stringify(searchParams),
      ]) as ApiResponseGetCourses;
    },
  });
  return query;
}

export function useGetNavbarCourses() {
  const queryClient = useQueryClient();
  const query = useQuery<ApiResponseGetNavbarCourses, Error>({
    queryKey: [COURSES_NAVBAR_QUERY_KEY],
    queryFn: () => getNavbarCourses(),
    initialData: () => {
      return queryClient.getQueryData([
        COURSES_NAVBAR_QUERY_KEY,
      ]) as ApiResponseGetNavbarCourses;
    },
  });
  return query;
}

export function useGetCourseWords({
  courseUuid,
  searchParams,
}: {
  courseUuid: string;
  searchParams: GetCourseItemsSchema;
}) {
  const queryClient = useQueryClient();
  const query = useQuery<ApiResponseGetCourseWords, Error>({
    queryKey: [
      COURSE_WORDS_QUERY_KEY + courseUuid + JSON.stringify(searchParams),
    ],
    queryFn: () => getCourseWords({ courseUuid, searchParams }),
    initialData: () => {
      return queryClient.getQueryData([
        COURSE_WORDS_QUERY_KEY + courseUuid + JSON.stringify(searchParams),
      ]) as ApiResponseGetCourseWords;
    },
  });
  return query;
}

export function useGetCourseWordByUuid(uuid: string) {
  const queryClient = useQueryClient();
  const query = useQuery<ApiResponseGetCourseWord, Error>({
    queryKey: [COURSE_WORDS_QUERY_KEY, uuid],
    queryFn: () => getCourseWordByUuid(uuid),
    initialData: () => {
      return queryClient.getQueryData([
        COURSE_WORDS_QUERY_KEY,
        uuid,
      ]) as ApiResponseGetCourseWord;
    },
  });
  return query;
}
