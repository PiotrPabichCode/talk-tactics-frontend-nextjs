import { axios } from '@/lib/axios';
import useCourseStore from '@/store/useCourseStore';
import {
  CourseDto,
  ApiResponseGetCourses,
  toGetCoursesResponseMapper,
  ApiResponseGetCourseWord,
  ApiRequestAssignCourseToUser,
  ApiRequestRemoveUserFromCourse,
  ApiResponseLearnCourseParticipantWord,
  ApiResponseGetCourseWords,
  toGetCourseWordsResponseMapper,
  ApiResponseGetNavbarCourses,
} from '@/typings/course';
import { buildPageableUrl } from '../common';
import {
  GetCourseItemsSchema,
  GetCoursesSchema,
} from '@/app/[locale]/(public)/courses/_lib/validations';

const COURSES = '/courses';
const COURSE_WORDS = '/course-words';
const COURSE_PARTICIPANTS = '/course-participants';
const COURSE_PARTICIPANT_WORDS = '/course-participants-words';

export const getCourses = async ({
  searchParams,
}: {
  searchParams: GetCoursesSchema;
}) => {
  const { data } = await axios<ApiResponseGetCourses>({
    method: 'GET',
    url: buildPageableUrl(COURSES, searchParams),
  });

  return toGetCoursesResponseMapper(data);
};

export const getNavbarCourses = async () => {
  const { data } = await axios<ApiResponseGetNavbarCourses>({
    method: 'GET',
    url: `${COURSES}/navbar`,
  });
  return data;
};

export const getCourseWords = async ({
  courseUuid,
  searchParams,
}: {
  courseUuid: string;
  searchParams: GetCourseItemsSchema;
}) => {
  const { data } = await axios<ApiResponseGetCourseWords>({
    method: 'GET',
    url:
      buildPageableUrl(COURSE_WORDS, searchParams) +
      `&courseUuid=${courseUuid}`,
  });
  return toGetCourseWordsResponseMapper(data);
};

export const getCourseWordByUuid = async (uuid: string) => {
  const { data } = await axios<ApiResponseGetCourseWord>({
    method: 'GET',
    url: `${COURSE_WORDS}/${uuid}`,
  });
  return data;
};

export const assignCourseToUser = async (req: ApiRequestAssignCourseToUser) => {
  await axios({
    method: 'PUT',
    url: COURSE_PARTICIPANTS,
    data: req,
  });
};

export const removeUserFromCourse = async (
  req: ApiRequestRemoveUserFromCourse
) => {
  await axios({
    method: 'DELETE',
    url: COURSE_PARTICIPANTS,
    data: req,
  });
};

export const learnCourseParticipantWord = async (uuid: string) => {
  const { data } = await axios<ApiResponseLearnCourseParticipantWord>({
    method: 'POST',
    url: `${COURSE_PARTICIPANT_WORDS}/${uuid}/learn`,
  });
  return data;
};
