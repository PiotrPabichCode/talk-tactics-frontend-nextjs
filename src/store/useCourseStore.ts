import { create } from 'zustand';
import { logger } from './logger';
import { CourseDto } from '@/typings/course';

export interface CourseStore {
  courses: CourseDto[];
  courseParticipants: CourseDto[];
  setCourses: (courses: CourseDto[]) => void;
  clearCourseParticipants: () => void;
  getCombinedCourses: () => CourseDto[];
  isCourseAdded: (courseUuid: string) => boolean;
}

const useCourseStore = create<CourseStore>()(
  logger<CourseStore>((set, get) => ({
    courses: [],
    courseParticipants: [],
    setCourses(courses) {
      set((state) => {
        const updatedCourses = [...state.courses];

        courses.forEach((newCourse) => {
          const existingCourseIndex = updatedCourses.findIndex(
            (course) => course.uuid === newCourse.uuid
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
    clearCourseParticipants() {
      set((state) => ({ ...state, courseParticipants: [] }));
    },
    getCombinedCourses() {
      const { courses, courseParticipants } = get();

      const courseMap = new Map(courses.map((course) => [course.uuid, course]));
      courseParticipants.forEach((course) => {
        if (courseMap.has(course.uuid)) {
          courseMap.set(course.uuid, course);
        }
      });

      return Array.from(courseMap.values());
    },
    isCourseAdded(courseUuid) {
      return get().courseParticipants.some(
        (userCourse) => userCourse.uuid === courseUuid
      );
    },
  }))
);

export const useCourseAdded = (courseUuid: string) =>
  useCourseStore().isCourseAdded(courseUuid);

export const useUserCoursesEmpty = () =>
  useCourseStore().courseParticipants.length === 0;

export const useCoursesEmpty = () => useCourseStore().courses.length === 0;

export default useCourseStore;
