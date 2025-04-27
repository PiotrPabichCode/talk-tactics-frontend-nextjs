export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export interface CourseWordDefinition {
  definition: string;
  example: string;
}

export interface Course {
  uuid: string;
  title: string;
  description: string;
  level: CourseLevel;
  quantity: number;
  points: number;
}

export interface CourseWord {
  uuid: string;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  audio: string;
  definitions: CourseWordDefinition[];
  course: Course;
}

export interface CourseWordDto {
  uuid: string;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  courseName: string;
}

export interface CourseNavbarDto {
  uuid: string;
  title: string;
  level: CourseLevel;
  quantity: number;
}

export interface CourseDto {
  uuid: string;
  title: string;
  description: string;
  level: CourseLevel;
  quantity: number;
  progress?: number;
  completed?: boolean;
}

export interface CourseParticipantPreviewDto {
  uuid: string;
  userUuid: string;
  courseUuid: string;
  progress: number;
  completed: boolean;
}

export interface CourseParticipant {
  uuid: string;
  points: number;
  progress: number;
  completed: number;
  course: CourseDto;
}

export interface CourseParticipantWordPreviewDto {
  uuid: string;
  courseWordUuid: string;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  learned: boolean;
}
