import { axios } from '@/lib/axios';
import useCourseStore from '@/store/useCourseStore';
import { CourseDto, CourseItemDto } from '@/typings/course';

const ENDPOINT = 'courses';
const COURSE_ITEM_ENDPOINT = 'course-items';

export const getCourses = async (): Promise<CourseDto[]> => {
  const { data } = await axios<CourseDto[]>({
    method: 'GET',
    url: ENDPOINT,
  });
  useCourseStore.getState().setCourses(data);
  return data;
};

export const getCourseItemsPreviewByCourseId = async ({
  courseId,
}: {
  courseId: string;
}): Promise<CourseItemDto[]> => {
  const { data } = await axios<CourseItemDto[]>({
    method: 'GET',
    url: `${COURSE_ITEM_ENDPOINT}/courses/${courseId}/course-items`,
  });
  return data;
};
