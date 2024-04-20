import { axios } from '@/lib/axios';
import useUserStore from '@/store/useUserStore';
import {
  ApiRequestGetUserDetails,
  ApiRequestUpdateUser,
  ApiResponseGetUserDetails,
  ApiResponseGetUserProfiles,
  ApiResponseUpdateUser,
  toGetUserDetailsResponseMapper,
  toGetUserProfilesResponseMapper,
  toUpdateUserRequestMapper,
  toUpdateUserResponseMapper,
} from '@/typings/user';

const USERS_ENDPOINT = 'users';

export const getUserDetails = async ({
  username,
}: ApiRequestGetUserDetails) => {
  const { data } = await axios<ApiResponseGetUserDetails>({
    method: 'GET',
    url: USERS_ENDPOINT + '/username/' + username,
  });
  useUserStore.getState().setUserDetails(toGetUserDetailsResponseMapper(data));
};

export const updateUser = async ({
  id,
  updatedFields,
}: ApiRequestUpdateUser) => {
  const { data } = await axios<ApiResponseUpdateUser>({
    method: 'PATCH',
    url: USERS_ENDPOINT + '/id/' + id,
    data: toUpdateUserRequestMapper(updatedFields),
  });
  useUserStore.getState().setUserDetails(toUpdateUserResponseMapper(data));
};

export const getUserProfiles = async () => {
  const { data } = await axios<ApiResponseGetUserProfiles>({
    method: 'GET',
    url: USERS_ENDPOINT + '/profiles',
  });
  return toGetUserProfilesResponseMapper(data);
};
