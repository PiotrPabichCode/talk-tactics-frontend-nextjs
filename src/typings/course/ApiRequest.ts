export interface ApiRequestAssignCourseToUser {
  courseUuid: string;
  userUuid: string;
}

export interface ApiRequestRemoveUserFromCourse {
  courseUuid: string;
  userUuid: string;
}

export interface ApiRequestGetCourseParticipant {
  courseUuid: string;
  userUuid: string;
}
