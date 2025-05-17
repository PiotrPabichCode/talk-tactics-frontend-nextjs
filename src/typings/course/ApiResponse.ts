import { mapPageContent, Page } from '../page.types';
import {
  CourseDto,
  CourseWord,
  CourseWordDto,
  Course,
  CourseWordDefinition,
  CourseNavbarDto,
} from './course';

export type ApiResponseGetCourses = Page<CourseDto>;

export const toGetCoursesResponseMapper = (
  res: ApiResponseGetCourses
): Page<CourseDto> =>
  mapPageContent(res, (course) => ({
    uuid: course.uuid,
    title: course.title,
    description: course.description,
    level: course.level,
    quantity: course.quantity,
  }));

export type ApiResponseGetNavbarCourses = CourseNavbarDto[];

export type ApiResponseGetCourseWords = Page<CourseWordDto>;

export const toGetCourseWordsResponseMapper = (
  res: ApiResponseGetCourseWords
): Page<CourseWordDto> =>
  mapPageContent(res, (item) => ({
    uuid: item.uuid,
    courseName: item.courseName,
    partOfSpeech: item.partOfSpeech,
    phonetic: item.phonetic,
    word: item.word,
  }));

export interface ApiResponseCourseWord {
  uuid: string;
  word: string;
  phonetic: string;
  audio: string;
  partOfSpeech: string;
  meanings: CourseWordDefinition[];
  course: Course;
}

export type ApiResponseGetCourseWord = CourseWord;
export interface ApiResponseLearnCourseParticipantWord {
  courseUuid: string;
}
