import { CourseLevel } from './course';

export const getLevel = (level: CourseLevel): string => {
  switch (level) {
    case CourseLevel.BEGINNER:
      return 'Beginner';
    case CourseLevel.INTERMEDIATE:
      return 'Intermediate';
    case CourseLevel.ADVANCED:
      return 'Advanced';
    default:
      return 'Unknown';
  }
};
