import {
  IApiAuthUser,
  IApiUserProfile,
  IApiUserProfilePreview,
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

export const toGetUserProfilesResponseMapper = (
  data: ApiResponseGetUserProfilePreviews
): IUserProfilePreview[] => {
  return data.map((profile) => ({
    id: profile.id,
    firstName: profile.first_name,
    lastName: profile.last_name,
    totalPoints: profile.total_points,
    bio: profile.bio,
  }));
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
