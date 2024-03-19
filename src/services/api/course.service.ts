import { axios } from '@/lib/axios';
import { CourseDto } from '@/typings/course';

const ENDPOINT = 'courses';

export const getCourses = async (): Promise<CourseDto[]> => {
  const { data } = await axios<CourseDto[]>({
    method: 'GET',
    url: ENDPOINT,
  });
  return data;
};
