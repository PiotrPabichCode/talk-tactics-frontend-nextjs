export interface ApiRequestAddUserCourse {
  courseId: number;
  userId: number;
}

export const toAddUserCourseRequestMapper = ({
  courseId,
  userId,
}: ApiRequestAddUserCourse) => {
  return {
    courseId: courseId,
    userId: userId,
  };
};

export interface ApiRequestDeleteUserCourse {
  courseId: number;
  userId: number;
}

export const toDeleteUserCourseRequestMapper = ({
  courseId,
  userId,
}: ApiRequestDeleteUserCourse) => {
  return {
    courseId: courseId,
    userId: userId,
  };
};

export interface ApiRequestGetUserCourse {
  courseId: number;
  userId: number;
}

export const toGetUserCourseRequestMapper = ({
  courseId,
  userId,
}: ApiRequestGetUserCourse) => {
  return {
    courseId: courseId,
    userId: userId,
  };
};
