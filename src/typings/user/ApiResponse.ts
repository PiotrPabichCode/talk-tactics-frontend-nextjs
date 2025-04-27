import {
  AuthUser,
  FriendInvitation,
  UserProfile,
  UserProfilePreview,
} from './user';

export type ApiResponseUpdateUser = AuthUser;
export type ApiResponseGetUserDetails = AuthUser;
export type ApiResponseGetUserProfilePreviews = UserProfilePreview[];
export type ApiResponseGetFriendList = UserProfilePreview[];
export type ApiResponseGetUserProfile = UserProfile;
export type ApiResponseGetReceivedFriendInvitations = FriendInvitation[];
export type ApiResponseGetSentFriendInvitations = FriendInvitation[];
