import { useMessages } from 'next-intl';
import { CourseLevel } from './course';
import get from 'lodash/get';

const getMessage = (key: string): string => {
  const messages = useMessages();
  return (get(messages, key) ?? 'Unknown') as string;
};

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

  return getMessage(`Common.levels.${value}`);
};
