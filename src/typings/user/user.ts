import { UserCourse } from '../course';

export interface IAuthUser {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export interface IApiAuthUser {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
}

export interface IUserProfilePreview {
  id: number;
  firstName: string;
  lastName: string;
  totalPoints: number;
  bio: string;
}

export interface IApiUserProfilePreview {
  id: number;
  first_name: string;
  last_name: string;
  total_points: number;
  bio: string;
}
export interface IUserProfile extends IUserProfilePreview {
  courses: UserCourse[];
}

export interface IApiUserProfile extends IApiUserProfilePreview {
  courses: UserCourse[];
}

export interface IFriendRequestDto {
  userId: number;
  friendId: number;
}

export interface IApiFriendRequestDto {
  user_id: number;
  friend_id: number;
}
