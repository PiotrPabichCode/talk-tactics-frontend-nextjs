import { create } from 'zustand';
import { logger } from './logger';
import { CourseDto } from '@/typings/course';

export interface CourseStore {
  courses: CourseDto[];
  userCourses: CourseDto[];
  setCourses: (courses: CourseDto[]) => void;
  clearUserCourses: () => void;
  setUserCourses: (userCourses: CourseDto[]) => void;
  getCombinedCourses: () => CourseDto[];
  isCourseAdded: (courseId: number) => boolean;
}

const useCourseStore = create<CourseStore>()(
  logger<CourseStore>((set, get) => ({
    courses: [],
    userCourses: [],
    setCourses(courses) {
      set((state) => {
        const updatedCourses = [...state.courses];

        courses.forEach((newCourse) => {
          const existingCourseIndex = updatedCourses.findIndex(
            (course) => course.id === newCourse.id
          );

          if (existingCourseIndex === -1) {
            updatedCourses.push(newCourse);
          }
        });

        return {
          ...state,
          courses: updatedCourses,
        };
      });
    },
    clearUserCourses() {
      set((state) => ({ ...state, userCourses: [] }));
    },
    setUserCourses(userCourses) {
      set({ userCourses });
    },
    getCombinedCourses() {
      const { courses, userCourses } = get();

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
