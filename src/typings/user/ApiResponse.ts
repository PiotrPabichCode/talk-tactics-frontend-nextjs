import {
  IApiAuthUser,
  IApiFriendInvitationDetailsDto,
  IApiFriendInvitationDto,
  IApiUserProfile,
  IApiUserProfilePreview,
  IFriendInvitationDetailsDto,
  IFriendInvitationDto,
  IUserProfile,
  IUserProfilePreview,
} from './user';

export type ApiResponseUpdateUser = IApiAuthUser;

export const toUpdateUserResponseMapper = ({
  firstName,
  lastName,
  email,
  bio,
}: ApiResponseUpdateUser) => {
  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    bio: bio,
  };
};

export type ApiResponseGetUserDetails = IApiAuthUser;

export const toGetUserDetailsResponseMapper = ({
  firstName,
  lastName,
  bio,
  email,
}: ApiResponseGetUserDetails) => {
  return {
    firstName: firstName,
    lastName: lastName,
    bio: bio,
    email: email,
  };
};

export type ApiResponseGetUserProfilePreviews = IApiUserProfilePreview[];
export type ApiResponseGetFriendList = IApiUserProfilePreview[];

export function mapToUserProfilePreview(
  profile: IApiUserProfilePreview
): IUserProfilePreview {
  return {
    id: profile.id,
    firstName: profile.firstName,
    lastName: profile.lastName,
    totalPoints: profile.totalPoints,
    bio: profile.bio,
  };
}

export const toGetUserProfilesResponseMapper = (
  data: IApiUserProfilePreview[]
): IUserProfilePreview[] => {
  return data.map((profile) => mapToUserProfilePreview(profile));
};

export type ApiResponseGetUserProfile = IApiUserProfile;

export const toGetUserProfileResponseMapper = (
  data: ApiResponseGetUserProfile
): IUserProfile => {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    totalPoints: data.totalPoints,
    bio: data.bio,
    courses: data.courses,
  };
};

export type ApiResponseGetReceivedFriendInvitations =
  | IApiFriendInvitationDto[]
  | IApiFriendInvitationDetailsDto[];
export type ApiResponseGetSentFriendInvitations =
  | IApiFriendInvitationDto[]
  | IApiFriendInvitationDetailsDto[];

export function mapToFriendInvitationDto(
  data: IApiFriendInvitationDto[]
): IFriendInvitationDto[] {
  return data.map((request) => ({
    senderId: request.senderId,
    receiverId: request.receiverId,
  }));
}

export function mapToFriendInvitationDetailsDto(
  data: IApiFriendInvitationDetailsDto[]
): IFriendInvitationDetailsDto[] {
  return data.map((request) => ({
    sender: mapToUserProfilePreview(request.sender),
    receiver: mapToUserProfilePreview(request.receiver),
  }));
}

export const toGetFriendInvitationsResponseMapper = (
  data: ApiResponseGetReceivedFriendInvitations,
  withDetails?: boolean
): IFriendInvitationDto[] | IFriendInvitationDetailsDto[] => {
  if (!withDetails) {
    return mapToFriendInvitationDto(data as IApiFriendInvitationDto[]);
  }
  return mapToFriendInvitationDetailsDto(
    data as IApiFriendInvitationDetailsDto[]
  );
};

export const toGetReceivedFriendInvitationsResponseMapper =
  toGetFriendInvitationsResponseMapper;

export const toGetSentFriendInvitationsResponseMapper =
  toGetFriendInvitationsResponseMapper;
