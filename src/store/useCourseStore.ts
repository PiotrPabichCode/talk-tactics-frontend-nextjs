import { create } from 'zustand';
import { logger } from './logger';
import { CourseDto, UserCoursePreviewDto } from '@/typings/course';
import { isArray, mergeWith } from 'lodash';

export interface CourseStore {
  courses: CourseDto[];
  setCourses: (courses: CourseDto[]) => void;
  clearUserCourses: () => void;
  setUserCourses: (userCourses: UserCoursePreviewDto[]) => void;
}

function combineCourses(
  courses: CourseDto[],
  userCourses: UserCoursePreviewDto[]
): CourseDto[] {
  const combined = courses.map((course) => {
    const userCourse = userCourses.find(
      (userCourse) => userCourse.courseId === course.id
    );
    if (userCourse) {
      return {
        ...course,
        progress: userCourse.progress,
        completed: userCourse.completed,
      };
    } else {
      return {
        ...course,
        progress: undefined,
        completed: undefined,
      };
    }
  });

  return combined;
}

const useCourseStore = create<CourseStore>()(
  logger<CourseStore>((set) => ({
    courses: [],
    setCourses(courses) {
      set((state) => {
        const updatedCourses = [...state.courses];

        courses.forEach((newCourse) => {
          const existingCourseIndex = updatedCourses.findIndex(
            (course) => course.id === newCourse.id
          );

          if (existingCourseIndex > -1) {
            const existingCourse = updatedCourses[existingCourseIndex];
            if (!existingCourse.progress) {
              updatedCourses[existingCourseIndex] = newCourse;
            }
          } else {
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
      set((state) => ({ courses: combineCourses(state.courses, []) }));
    },
    setUserCourses(userCourses) {
      set((state) => ({ courses: combineCourses(state.courses, userCourses) }));
    },
  }))
);

export default useCourseStore;
