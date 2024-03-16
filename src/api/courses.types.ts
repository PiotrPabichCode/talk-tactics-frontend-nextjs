export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export type Meaning = {
  id: string;
  definition: string;
  example: string;
};

export type UserCourse = {
  id: string;
  progress: boolean;
  completed: boolean;
};

export type UserCourseItem = {
  id: string;
  isLearned: boolean;
};

export type CourseItem = {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meanings: Meaning[];
};

export type Course = {
  id: string;
  name: string;
  description: string;
  level: CourseLevel;
  numEvents: number;
  courseItems: CourseItem[];
};
