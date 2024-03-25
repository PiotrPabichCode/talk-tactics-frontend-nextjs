import { IApiAuthUser } from './user';

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
