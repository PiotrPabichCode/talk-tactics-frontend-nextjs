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

export interface CourseItem {
  id: number;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meanings: WordMeaning[];
}

export interface CourseItemDto {
  id: number;
  word: string;
  courseName: string;
}

export interface CourseDto {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  courseItemsCount: number;
}

export const CourseDtoSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  level: CourseLevelSchema,
  courseItemsCount: z.number(),
});

export type Course = z.infer<typeof CourseDtoSchema>;
