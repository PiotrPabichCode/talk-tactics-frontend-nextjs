import { IApiAuthUser, IApiUserProfile } from './user';

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

export type ApiResponseGetUserProfiles = IApiUserProfile[];

export const toGetUserProfilesResponseMapper = (
  data: ApiResponseGetUserProfiles
) => {
  return data.map((profile) => ({
    id: profile.id,
    fullName: profile.full_name,
    totalPoints: profile.total_points,
    bio: profile.bio,
  }));
};
