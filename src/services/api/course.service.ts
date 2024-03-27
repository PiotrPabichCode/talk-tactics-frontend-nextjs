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
  ApiResponseGetUserCoursesPreviewByUserId,
  toGetUserCoursesPreviewByUserIdResponseMapper,
  ApiRequestDeleteUserCourse,
  toDeleteUserCourseRequestMapper,
  toGetUserCourseRequestMapper,
  ApiRequestGetUserCourse,
  ApiRequestGetUserCourseItemsPreview,
  toGetUserCourseItemsPreviewRequestMapper,
  ApiResponseGetUserCourseItemsPreview,
  toGetUserCourseItemsPreviewResponseMapper,
} from '@/typings/course';

const ENDPOINT = 'courses';
const COURSE_ITEM_ENDPOINT = 'course-items';
const USER_COURSE_ENDPOINT = 'user-courses';
const USER_COURSE_ITEM_ENDPOINT = 'user-course-items';

export const getCourses = async (): Promise<CourseDto[]> => {
  const { data } = await axios<ApiResponseGetCourses>({
    method: 'GET',
    url: ENDPOINT,
  });
  const res = toGetCourseResponseMapper(data);
  useCourseStore.getState().setCourses(res);
  return res;
};

export const getUserCoursesPreviewByUserId = async ({ id }: { id: number }) => {
  const { data } = await axios<ApiResponseGetUserCoursesPreviewByUserId>({
    method: 'GET',
    url: `${USER_COURSE_ENDPOINT}/preview/user-id/${id}`,
  });
  const res = toGetUserCoursesPreviewByUserIdResponseMapper(data);
  useCourseStore.getState().setUserCourses(res);
  return res;
};

export const getCourseItemsPreviewByCourseId = async ({
  courseId,
}: {
  courseId: string;
}): Promise<CourseItemDto[]> => {
  const { data } = await axios<ApiResponseGetCourseItemsPreviewByCourseId>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/courses/${courseId}/course-items`,
  });
  const res = toGetCourseItemsPreviewByCourseIdResponseMapper(data);
  return res;
};

export const getCourseItemById = async ({
  id,
}: {
  id: string;
}): Promise<CourseItem> => {
  const { data } = await axios<ApiResponseGetCourseItemById>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/${id}`,
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
    url: `${USER_COURSE_ENDPOINT}`,
    data: toDeleteUserCourseRequestMapper(req),
  });
};

export const learnUserCourseItem = async ({ id }: { id: number }) => {
  await axios({
    method: 'POST',
    url: `${USER_COURSE_ITEM_ENDPOINT}/${id}/learn`,
  });
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
    url: `${USER_COURSE_ITEM_ENDPOINT}/preview`,
    data: toGetUserCourseItemsPreviewRequestMapper(req),
  });

  const res = toGetUserCourseItemsPreviewResponseMapper(data);

  return res;
};
