import { axios } from './axios';
import type { Course } from './courses.types';
import type { Page } from '@/typings/page.types';

type CourseFilters = {};

const ENDPOINT = '/courses';

export async function getCourses(
  page: number,
  filters: CourseFilters = {},
  options?: { signal?: AbortSignal }
) {
  const { data } = await axios.get<Page<Course>>(ENDPOINT, {
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
