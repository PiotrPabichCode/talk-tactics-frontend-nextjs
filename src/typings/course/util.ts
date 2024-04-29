import { useTranslations } from 'next-intl';
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

export const LocalizeCourseLevel = (level: CourseLevel): string => {
  const t = useTranslations('Common.levels');
  switch (level) {
    case CourseLevel.BEGINNER:
      return t('beginner');
    case CourseLevel.INTERMEDIATE:
      return t('intermediate');
    case CourseLevel.ADVANCED:
      return t('advanced');
    default:
      return 'Unknown';
  }
};
