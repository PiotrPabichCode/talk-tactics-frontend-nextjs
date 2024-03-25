import { z } from 'zod';

type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const CourseLevelSchema = z.union([
  z.literal('BEGINNER'),
  z.literal('INTERMEDIATE'),
  z.literal('ADVANCED'),
]);

export interface WordMeaning {
  id: number;
  definition: string;
  example: string;
}

interface ICourse {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
}

export interface CourseItem {
  id: number;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meanings: WordMeaning[];
  course: ICourse;
}

export interface ApiResponseCourseItem {
  id: number;
  word: string;
  phonetic: string;
  part_of_speech: string;
  meanings: WordMeaning[];
  course: ICourse;
}

export const toCourseItemResMapper = (
  res: ApiResponseCourseItem
): CourseItem => {
  const { id, word, phonetic, part_of_speech, meanings, course } = res;
  return {
    id: id,
    word: word,
    partOfSpeech: part_of_speech,
    phonetic: phonetic,
    meanings: meanings,
    course: course,
  };
};

export interface CourseItemDto {
  id: number;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  courseName: string;
}

export interface ApiResponseCourseItemDto {
  id: number;
  word: string;
  part_of_speech: string;
  phonetic: string;
  course_name: string;
}

export const toCourseItemDtoResMapper = (
  res: ApiResponseCourseItemDto[]
): CourseItemDto[] => {
  return res.map((item) => ({
    id: item.id,
    word: item.word,
    partOfSpeech: item.part_of_speech,
    phonetic: item.phonetic,
    courseName: item.course_name,
  }));
};

export interface CourseDto {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  courseItemsCount: number;
}

export interface ApiResponseCourseDto {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  course_items_count: number;
}

export const toCourseDtoResMapper = (
  res: ApiResponseCourseDto[]
): CourseDto[] => {
  return res.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    level: item.level,
    courseItemsCount: item.course_items_count,
  }));
};

export const CourseDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  level: CourseLevelSchema,
  courseItemsCount: z.number(),
});

export type Course = z.infer<typeof CourseDtoSchema>;
