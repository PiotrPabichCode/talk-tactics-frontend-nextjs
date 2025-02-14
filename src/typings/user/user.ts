import { UserCourse } from '../course';

export interface IAuthUser {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export interface IApiAuthUser {
  firstName: string;
  lastName: string;
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
  firstName: string;
  lastName: string;
  totalPoints: number;
  bio: string;
}
export interface IUserProfile extends IUserProfilePreview {
  courses: UserCourse[];
}

export interface IApiUserProfile extends IApiUserProfilePreview {
  courses: UserCourse[];
}

export interface IFriendInvitationDto {
  senderId: number;
  receiverId: number;
}

export interface IApiFriendInvitationDto {
  senderId: number;
  receiverId: number;
}

export interface IFriendInvitationDetailsDto {
  sender: IUserProfilePreview;
  receiver: IUserProfilePreview;
}

export interface IApiFriendInvitationDetailsDto {
  sender: IApiUserProfilePreview;
  receiver: IApiUserProfilePreview;
}

export interface IDeleteFriendDto {
  userId: number;
  friendId: number;
}

export interface IApiDeleteFriendDto {
  userId: number;
  friendId: number;
}
