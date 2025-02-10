export interface ApiRequestAddUserCourse {
  courseId: number;
  userId: number;
}

export const toAddUserCourseRequestMapper = ({
  courseId,
  userId,
}: ApiRequestAddUserCourse) => {
  return {
    course_id: courseId,
    user_id: userId,
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
    course_id: courseId,
    user_id: userId,
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
    course_id: courseId,
    user_id: userId,
  };
};
