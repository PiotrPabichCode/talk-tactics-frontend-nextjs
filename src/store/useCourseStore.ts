import { create } from 'zustand';
import { logger } from './logger';
import { CourseDto } from '@/typings/course';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';

export interface CourseStore {
  courses: CourseDto[];
  userCourses: CourseDto[];
  setCourses: (courses: CourseDto[]) => void;
  clearUserCourses: () => void;
  setUserCourses: (userCourses: CourseDto[]) => void;
  getCombinedCourses: (
    pagination: PaginationState,
    filters: ColumnFiltersState
  ) => CourseDto[];
  isCourseAdded: (courseId: number) => boolean;
}

const useCourseStore = create<CourseStore>()(
  logger<CourseStore>((set, get) => ({
    courses: [],
    userCourses: [],
    setCourses(courses) {
      set({ courses });
    },
    clearUserCourses() {
      set((state) => ({ ...state, userCourses: [] }));
    },
    setUserCourses(userCourses) {
      set((state) => {
        const updatedUserCourses = [...state.userCourses];

        userCourses.forEach((newUserCourse) => {
          const existingUserCourseIndex = updatedUserCourses.findIndex(
            (userCourse) => userCourse.id === newUserCourse.id
          );

          if (existingUserCourseIndex === -1) {
            updatedUserCourses.push(newUserCourse);
          }
        });

        return {
          ...state,
          userCourses: updatedUserCourses,
        };
      });
    },
    getCombinedCourses(pagination, filters) {
      const { courses, userCourses } = get();

      if (filters.some((filter) => filter.id === 'progress')) {
        return userCourses;
      }

      const courseMap = new Map(courses.map((course) => [course.id, course]));
      userCourses.forEach((course) => {
        if (courseMap.has(course.id)) {
          courseMap.set(course.id, course);
        }
      });

      return Array.from(courseMap.values()).sort((a, b) => a.id - b.id);
    },
    isCourseAdded(courseId) {
      return get().userCourses.some((userCourse) => userCourse.id === courseId);
    },
  }))
);

export const useCourseAdded = (courseId: number) =>
  useCourseStore().isCourseAdded(courseId);

export const useUserCoursesEmpty = () =>
  useCourseStore().userCourses.length === 0;

export const useCoursesEmpty = () => useCourseStore().courses.length === 0;

export default useCourseStore;
