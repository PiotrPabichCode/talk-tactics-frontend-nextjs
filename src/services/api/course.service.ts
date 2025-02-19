import { axios } from '@/lib/axios';
import useCourseStore from '@/store/useCourseStore';
import {
  CourseDto,
  ApiResponseGetCourses,
  toGetCourseResponseMapper,
  ApiResponseGetCourseItem,
  toGetCourseItemResponseMapper,
  CourseItem,
  CourseItemDto,
  ApiRequestAddUserCourse,
  toAddUserCourseRequestMapper,
  ApiRequestDeleteUserCourse,
  toDeleteUserCourseRequestMapper,
  toGetUserCourseRequestMapper,
  ApiRequestGetUserCourse,
  CourseNavbarDto,
  toLearnUserCourseItemResponseMapper,
  ApiResponseLearnUserCourseItem,
  ApiResponseGetCourseItems,
  toGetCourseItemsResponseMapper,
} from '@/typings/course';
import { Page } from '@/typings/page.types';
import { buildPageableUrl } from '../common';
import {
  GetCourseItemsSchema,
  GetCoursesSchema,
} from '@/app/[locale]/(public)/courses/_lib/validations';

const ENDPOINT = 'courses';
const COURSE_ITEM_ENDPOINT = 'course-items';
const USER_COURSE_ENDPOINT = 'user-courses';
const USER_COURSE_ITEM_ENDPOINT = 'user-course-items';

export const getCourses = async ({
  searchParams,
}: {
  searchParams: GetCoursesSchema;
}): Promise<Page<CourseDto>> => {
  let updatedSearchParams = { ...searchParams };
  if (searchParams.title) {
    updatedSearchParams.search = searchParams.title;
  }
  const { data } = await axios<ApiResponseGetCourses>({
    method: 'GET',
    url: buildPageableUrl(ENDPOINT, updatedSearchParams),
  });

  return toGetCourseResponseMapper(data);
};

export const getNavbarCourses = async (): Promise<CourseNavbarDto[]> => {
  const { data } = await axios<CourseNavbarDto[]>({
    method: 'GET',
    url: ENDPOINT + '/navbar',
  });

  return data;
};

export const getCourseItems = async ({
  courseId,
  searchParams,
}: {
  courseId: Number;
  searchParams: GetCourseItemsSchema;
}) => {
  let updatedSearchParams = { ...searchParams };
  // if (searchParams.title) {
  //   updatedSearchParams.search = searchParams.title;
  // }
  const { data } = await axios<ApiResponseGetCourseItems>({
    method: 'GET',
    url:
      buildPageableUrl(COURSE_ITEM_ENDPOINT, updatedSearchParams) +
      `&courseId=${courseId}`,
  });
  return toGetCourseItemsResponseMapper(data);
};

export const getUserCourses = async ({ id }: { id: number }) => {
  const { data } = await axios<CourseDto[]>({
    method: 'GET',
    url: `${USER_COURSE_ENDPOINT}/id/${id}`,
  });
  useCourseStore.getState().setUserCourses(data);
  return data;
};

export const getCourseItemById = async ({
  id,
}: {
  id: number;
}): Promise<CourseItem> => {
  const { data } = await axios<ApiResponseGetCourseItem>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/${id}`,
  });
  return toGetCourseItemResponseMapper(data);
};

export const addUserCourse = async (req: ApiRequestAddUserCourse) => {
  await axios({
    method: 'PUT',
    url: USER_COURSE_ENDPOINT,
    data: toAddUserCourseRequestMapper(req),
  });
};

export const deleteUserCourse = async (req: ApiRequestDeleteUserCourse) => {
  await axios({
    method: 'DELETE',
    url: USER_COURSE_ENDPOINT,
    data: toDeleteUserCourseRequestMapper(req),
  });
};

export const learnUserCourseItem = async ({ id }: { id: number }) => {
  const { data } = await axios<ApiResponseLearnUserCourseItem>({
    method: 'POST',
    url: `${USER_COURSE_ITEM_ENDPOINT}/learn/id/${id}`,
  });
  return toLearnUserCourseItemResponseMapper(data);
};

export const getUserCourse = async (req: ApiRequestGetUserCourse) => {
  return await axios<CourseItemDto[]>({
    method: 'POST',
    url: USER_COURSE_ENDPOINT,
    data: toGetUserCourseRequestMapper(req),
  });
};
