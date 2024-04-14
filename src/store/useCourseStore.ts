import { create } from 'zustand';
import { logger } from './logger';
import { CourseDto, UserCoursePreviewDto } from '@/typings/course';

export interface CourseStore {
  courses: CourseDto[];
  userCourses: UserCoursePreviewDto[];
  setCourses: (courses: CourseDto[]) => void;
  clearUserCourses: () => void;
  setUserCourses: (userCourses: UserCoursePreviewDto[]) => void;
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
    getCombinedCourses() {
      return get().courses.map((course) => {
        const userCourse = get().userCourses.find(
          (userCourse) => userCourse.courseId === course.id
        );

        if (userCourse) {
          return {
            ...course,
            progress: userCourse.progress,
            completed: userCourse.completed,
            isAdded: true,
          };
        }

        return {
          ...course,
          isAdded: false,
        };
      });
    },
    isCourseAdded(courseId) {
      return get().userCourses.some(
        (userCourse) => userCourse.courseId === courseId
      );
    },
  }))
);

export const useCourseAdded = (courseId: number) =>
  useCourseStore().isCourseAdded(courseId);

export const useCoursesEmpty = () => useCourseStore().courses.length === 0;

export default useCourseStore;
