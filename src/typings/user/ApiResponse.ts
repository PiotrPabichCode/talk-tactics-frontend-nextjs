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
  first_name,
  last_name,
  email,
  bio,
}: ApiResponseUpdateUser) => {
  return {
    firstName: first_name,
    lastName: last_name,
    email: email,
    bio: bio,
  };
};

export type ApiResponseGetUserDetails = IApiAuthUser;

export const toGetUserDetailsResponseMapper = ({
  first_name,
  last_name,
  bio,
  email,
}: ApiResponseGetUserDetails) => {
  return {
    firstName: first_name,
    lastName: last_name,
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
    firstName: profile.first_name,
    lastName: profile.last_name,
    totalPoints: profile.total_points,
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
    firstName: data.first_name,
    lastName: data.last_name,
    totalPoints: data.total_points,
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
    senderId: request.sender_id,
    receiverId: request.receiver_id,
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
