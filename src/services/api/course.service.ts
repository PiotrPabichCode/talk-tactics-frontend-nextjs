import { axios } from '@/lib/axios';
import useCourseStore from '@/store/useCourseStore';
import {
  CourseDto,
  ApiResponseGetCourses,
  toGetCourseResponseMapper,
  ApiResponseGetCourseItemById,
  toGetCourseItemByIdResponseMapper,
  CourseItem,
  CourseItemDto,
  ApiResponseGetCourseItemsPreviewByCourseId,
  toGetCourseItemsPreviewByCourseIdResponseMapper,
  ApiRequestAddUserCourse,
  toAddUserCourseRequestMapper,
  ApiRequestDeleteUserCourse,
  toDeleteUserCourseRequestMapper,
  toGetUserCourseRequestMapper,
  ApiRequestGetUserCourse,
  ApiRequestGetUserCourseItemsPreview,
  toGetUserCourseItemsPreviewRequestMapper,
  ApiResponseGetUserCourseItemsPreview,
  toGetUserCourseItemsPreviewResponseMapper,
  CourseNavbarDto,
  toLearnUserCourseItemResponseMapper,
  ApiResponseLearnUserCourseItem,
} from '@/typings/course';

const ENDPOINT = 'courses';
const COURSE_ITEM_ENDPOINT = 'course-items';
const USER_COURSE_ENDPOINT = 'user-courses';
const USER_COURSE_ITEM_ENDPOINT = 'user-course-items';

export const getCourses = async (): Promise<CourseDto[]> => {
  const { data } = await axios<ApiResponseGetCourses>({
    method: 'GET',
    url: ENDPOINT + '/all/preview',
  });
  const res = toGetCourseResponseMapper(data);
  useCourseStore.getState().setCourses(res);
  return res;
};

export const getNavbarCourses = async (): Promise<CourseNavbarDto[]> => {
  const { data } = await axios<CourseNavbarDto[]>({
    method: 'GET',
    url: ENDPOINT + '/navbar',
  });

  return data;
};

export const getUserCourses = async ({ id }: { id: number }) => {
  const { data } = await axios<CourseDto[]>({
    method: 'GET',
    url: `${USER_COURSE_ENDPOINT}/user-id/${id}`,
  });
  useCourseStore.getState().setUserCourses(data);
  return data;
};

export const getCourseItemsPreviewByCourseId = async ({
  courseId,
}: {
  courseId: number;
}): Promise<CourseItemDto[]> => {
  const { data } = await axios<ApiResponseGetCourseItemsPreviewByCourseId>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/preview/courses/id/${courseId}`,
  });
  const res = toGetCourseItemsPreviewByCourseIdResponseMapper(data);
  return res;
};

export const getCourseItemById = async ({
  id,
}: {
  id: number;
}): Promise<CourseItem> => {
  const { data } = await axios<ApiResponseGetCourseItemById>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/id/${id}`,
  });
  const res = toGetCourseItemByIdResponseMapper(data);
  return res;
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

export const getUserCourseItemsPreview = async (
  req: ApiRequestGetUserCourseItemsPreview
) => {
  const { data } = await axios<ApiResponseGetUserCourseItemsPreview>({
    method: 'POST',
    url: `${USER_COURSE_ITEM_ENDPOINT}/all/preview`,
    data: toGetUserCourseItemsPreviewRequestMapper(req),
  });

  return toGetUserCourseItemsPreviewResponseMapper(data);
};
