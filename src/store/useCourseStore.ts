import { create } from 'zustand';
import { logger } from './logger';
import { CourseDto, UserCoursePreviewDto } from '@/typings/course';

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

  console.log('Combined', combined);
  return combined;
}

const useCourseStore = create<CourseStore>()(
  logger<CourseStore>((set) => ({
    courses: [],
    setCourses(courses) {
      set(() => ({
        courses: courses,
      }));
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
