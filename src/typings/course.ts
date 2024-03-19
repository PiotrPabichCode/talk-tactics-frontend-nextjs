type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface CourseDto {
  id: number;
  name: string;
  description: string;
  level: CourseLevel;
  courseItemsCount: number;
}
