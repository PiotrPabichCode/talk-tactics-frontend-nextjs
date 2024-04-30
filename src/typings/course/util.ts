import { GetLocalizedMessage } from '@/i18n';
import { CourseLevel } from './course';

export const LocalizeCourseLevel = (level: CourseLevel): string => {
  let value = '';
  switch (level) {
    case CourseLevel.BEGINNER:
      value = 'beginner';
      break;
    case CourseLevel.INTERMEDIATE:
      value = 'intermediate';
      break;
    case CourseLevel.ADVANCED:
      value = 'advanced';
      break;
  }

  return GetLocalizedMessage(`Common.levels.${value}`);
};
