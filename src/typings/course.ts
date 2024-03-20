import { z } from 'zod';

type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

const CourseLevelSchema = z.union([
  z.literal('BEGINNER'),
  z.literal('INTERMEDIATE'),
  z.literal('ADVANCED'),
]);

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
