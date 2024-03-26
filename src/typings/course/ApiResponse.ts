import {
  ApiCourseDto,
  ApiCourseItem,
  ApiCourseItemDto,
  ApiUserCoursePreviewDto,
  CourseDto,
  CourseItem,
  ICourse,
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
  course,
  phonetic,
}: ApiResponseCourseItem): CourseItem => {
  return {
    id: id,
    word: word,
    meanings: meanings,
    partOfSpeech: part_of_speech,
    course: course,
    phonetic: phonetic,
  };
};

export type ApiResponseGetUserCoursesPreviewByUserId =
  ApiUserCoursePreviewDto[];

export const toGetUserCoursesPreviewByUserIdResponseMapper = (
  res: ApiResponseGetUserCoursesPreviewByUserId
) => {
  return res.map((userCourse) => ({
    id: userCourse.id,
    userId: userCourse.user_id,
    courseId: userCourse.course_id,
    progress: userCourse.progress,
    completed: userCourse.completed,
  }));
};
