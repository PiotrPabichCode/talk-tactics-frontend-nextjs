import {
  ApiCourseDto,
  ApiCourseItem,
  ApiCourseItemDto,
  ApiUserCourseItemPreviewDto,
  ApiUserCoursePreviewDto,
  CourseDto,
  CourseItem,
  ICourse,
  UserCourseItemPreviewDto,
  WordMeaning,
} from './course';

export type ApiResponseGetCourses = ApiCourseDto[];

export const toGetCourseResponseMapper = (
  res: ApiResponseGetCourses
): CourseDto[] => {
  return res.map((course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    level: course.level,
    quantity: course.quantity,
  }));
};

export type ApiResponseGetCourseItemsPreviewByCourseId = ApiCourseItemDto[];

export const toGetCourseItemsPreviewByCourseIdResponseMapper = (
  res: ApiResponseGetCourseItemsPreviewByCourseId
) => {
  return res.map((course) => ({
    id: course.id,
    word: course.word,
    partOfSpeech: course.part_of_speech,
    phonetic: course.phonetic,
    courseName: course.course_name,
  }));
};

export interface ApiResponseCourseItem {
  id: number;
  word: string;
  phonetic: string;
  audio: string;
  part_of_speech: string;
  meanings: WordMeaning[];
  course: ICourse;
}

export type ApiResponseGetCourseItemById = ApiCourseItem;

export const toGetCourseItemByIdResponseMapper = ({
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

export interface ApiResponseGetUserCourseItemsPreview {
  course_name: string;
  items: ApiUserCourseItemPreviewDto[];
}

export interface ResponseGetUserCourseItemsPreview {
  courseName: string;
  items: UserCourseItemPreviewDto[];
}

export const toGetUserCourseItemsPreviewResponseMapper = ({
  course_name,
  items,
}: ApiResponseGetUserCourseItemsPreview): ResponseGetUserCourseItemsPreview => {
  return {
    courseName: course_name,
    items: items.map((item) => ({
      id: item.id,
      courseItemId: item.course_item_id,
      word: item.word,
      phonetic: item.phonetic,
      learned: item.learned,
      partOfSpeech: item.part_of_speech,
    })),
  };
};

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
