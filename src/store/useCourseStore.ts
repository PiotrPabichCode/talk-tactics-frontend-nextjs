import { create } from 'zustand';
import { logger } from './logger';
import { CourseDto } from '@/typings/course';

export interface CourseStore {
  courses: CourseDto[];
  setCourses: (courses: CourseDto[]) => void;
}

const useCourseStore = create<CourseStore>()(
  logger<CourseStore>((set) => ({
    courses: [],
    setCourses(courses) {
      set(() => ({ courses: courses }));
    },
  }))
);

export default useCourseStore;
