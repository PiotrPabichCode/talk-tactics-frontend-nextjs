import type { Course } from './courses.types';
import type { Page1 } from '@/typings/page.types';
import { axios } from '@/lib/axios';

type CourseFilters = {};

const ENDPOINT = '/courses';

export async function getCourses(
  page: number,
  filters: CourseFilters = {},
  options?: { signal?: AbortSignal }
) {
  // const { data } = await request({
  //   method: 'GET',
  //   url: ENDPOINT,

  // })
  const { data } = await axios.get<Page1<Course>>(ENDPOINT, {
    params: { page, ...filters },
    signal: options?.signal,
  });
  return data;
}

export async function resolveCourse(courseId: string) {
  const { data } = await axios.patch(`${ENDPOINT}/${courseId}`, {
    status: 'resolved',
  });
  return data;
}
