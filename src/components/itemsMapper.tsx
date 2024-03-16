'use client';
import { useGetCourses } from '@/features/courses/api/use-get-courses';

export function ItemsMapper() {
  const coursesPage = useGetCourses(1);

  if (coursesPage.isLoading) {
    return <div>Loading...</div>;
  }
  if (coursesPage.isError) {
    console.error(coursesPage.error);
    return <div>Error loading courses: {coursesPage.error.message}</div>;
  }

  const { items, meta } = coursesPage.data || {};

  console.log('Items', items);
  console.log('Meta', meta);

  return <div className='text-white'>ala ma kota</div>;
}
