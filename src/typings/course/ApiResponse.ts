import { mapPageContent, Page } from '../page.types';
import {
  ApiCourseDto,
  ApiCourseItem,
  ApiCourseItemDto,
  CourseDto,
  CourseItem,
  CourseItemDto,
  ICourse,
  UserCourseItemPreviewDto,
  WordMeaning,
} from './course';

export type ApiResponseGetCourses = Page<ApiCourseDto>;

export const toGetCourseResponseMapper = (
  res: ApiResponseGetCourses
): Page<CourseDto> =>
  mapPageContent(res, (course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    level: course.level,
    quantity: course.quantity,
  }));

export type ApiResponseGetCourseItems = Page<ApiCourseItemDto>;

export const toGetCourseItemsResponseMapper = (
  res: ApiResponseGetCourseItems
): Page<CourseItemDto> =>
  mapPageContent(res, (item) => ({
    id: item.id,
    courseName: item.course_name,
    partOfSpeech: item.part_of_speech,
    phonetic: item.phonetic,
    word: item.word,
  }));

export interface ApiResponseCourseItem {
  id: number;
  word: string;
  phonetic: string;
  audio: string;
  part_of_speech: string;
  meanings: WordMeaning[];
  course: ICourse;
}

export type ApiResponseGetCourseItem = ApiCourseItem;

export const toGetCourseItemResponseMapper = ({
  id,
  word,
  meanings,
  part_of_speech,
  audio,
  course,
  phonetic,
}: ApiResponseCourseItem): CourseItem => {
  return {
    id: id,
    word: word,
    meanings: meanings,
    partOfSpeech: part_of_speech,
    audio: audio,
    course: course,
    phonetic: phonetic,
  };
};

export interface ResponseGetUserCourseItemsPreview {
  courseName: string;
  items: UserCourseItemPreviewDto[];
}

export interface ApiResponseLearnUserCourseItem {
  course_id: number;
}

export interface ResponseLearnUserCourseItem {
  courseId: number;
}

export const toLearnUserCourseItemResponseMapper = ({
  course_id,
}: ApiResponseLearnUserCourseItem) => {
  return {
    courseId: course_id,
  };
};
