import { axios } from '@/lib/axios';
import useCourseStore from '@/store/useCourseStore';
import { CourseDto } from '@/typings/course';

const ENDPOINT = 'courses';

export const getCourses = async (): Promise<CourseDto[]> => {
  const { data } = await axios<CourseDto[]>({
    method: 'GET',
    url: ENDPOINT,
  });
  useCourseStore.getState().setCourses(data);
  return data;
};
