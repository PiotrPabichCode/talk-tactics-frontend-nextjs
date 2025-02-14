import { z } from 'zod';

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export interface WordMeaning {
  id: number;
  definition: string;
  example: string;
}

export interface ICourse {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  quantity: number;
}

export interface CourseItem {
  id: number;
  word: string;
  phonetic: string;
  audio: string;
  partOfSpeech: string;
  meanings: WordMeaning[];
  course: ICourse;
}

export interface ApiCourseItem {
  id: number;
  word: string;
  phonetic: string;
  audio: string;
  partOfSpeech: string;
  meanings: WordMeaning[];
  course: ICourse;
}

export interface CourseItemDto {
  id: number;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  courseName: string;
}

export interface ApiCourseItemDto {
  id: number;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  courseName: string;
}

export interface CourseNavbarDto {
  id: number;
  title: string;
  level: CourseLevel;
  quantity: number;
}

export interface CourseDto {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  quantity: number;
  progress?: number;
  completed?: boolean;
}

export interface ApiCourseDto {
  id: number;
  title: string;
  description: string;
  level: CourseLevel;
  quantity: number;
}

export interface UserCoursePreviewDto {
  id: number;
  userId: number;
  courseId: number;
  progress: number;
  completed: boolean;
}

export interface ApiUserCoursePreviewDto {
  id: number;
  userId: number;
  courseId: number;
  progress: number;
  completed: boolean;
}

export interface UserCourse extends ICourse {
  points: number;
  progress: number;
  completed: number;
}

export interface UserCourseItemPreviewDto {
  id: number;
  courseItemId: number;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  learned: boolean;
}

export interface ApiUserCourseItemPreviewDto {
  id: number;
  courseItemId: number;
  word: string;
  partOfSpeech: string;
  phonetic: string;
  learned: boolean;
}
