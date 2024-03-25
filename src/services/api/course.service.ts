import { axios } from '@/lib/axios';
import useCourseStore from '@/store/useCourseStore';
import {
  ApiResponseCourseDto,
  ApiResponseCourseItem,
  ApiResponseCourseItemDto,
  CourseDto,
  CourseItem,
  CourseItemDto,
  toCourseDtoResMapper,
  toCourseItemDtoResMapper,
  toCourseItemResMapper,
} from '@/typings/course';

const ENDPOINT = 'courses';
const COURSE_ITEM_ENDPOINT = 'course-items';

export const getCourses = async (): Promise<CourseDto[]> => {
  const { data } = await axios<ApiResponseCourseDto[]>({
    method: 'GET',
    url: ENDPOINT,
  });
  const res = toCourseDtoResMapper(data);
  useCourseStore.getState().setCourses(res);
  return res;
};

export const getCourseItemsPreviewByCourseId = async ({
  courseId,
}: {
  courseId: string;
}): Promise<CourseItemDto[]> => {
  const { data } = await axios<ApiResponseCourseItemDto[]>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/courses/${courseId}/course-items`,
  });
  const res = toCourseItemDtoResMapper(data);
  return res;
};

export const getCourseItemById = async ({
  id,
}: {
  id: string;
}): Promise<CourseItem> => {
  const { data } = await axios<ApiResponseCourseItem>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/${id}`,
  });
  const res = toCourseItemResMapper(data);
  return res;
};
