import { axios } from '@/lib/axios';
import useUserStore from '@/store/useUserStore';
import {
  ApiRequestAcceptFriendRequest,
  ApiRequestGetUserDetails,
  ApiRequestRejectFriendRequest,
  ApiRequestSendFriendRequest,
  ApiRequestUpdateUser,
  ApiResponseGetUserDetails,
  ApiResponseGetUserProfile,
  ApiResponseGetUserProfilePreviews,
  ApiResponseUpdateUser,
  toAcceptFriendRequestMapper,
  toGetUserDetailsResponseMapper,
  toGetUserProfileResponseMapper,
  toGetUserProfilesResponseMapper,
  toRejectFriendRequestMapper,
  toSendFriendRequestMapper,
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
  const { data } = await axios<ApiResponseGetUserProfilePreviews>({
    method: 'GET',
    url: USERS_ENDPOINT + '/profiles',
  });
  return toGetUserProfilesResponseMapper(data);
};

export const getUserProfileByUserId = async ({ id }: { id: number }) => {
  const { data } = await axios<ApiResponseGetUserProfile>({
    method: 'GET',
    url: USERS_ENDPOINT + '/profiles/' + id,
  });
  return toGetUserProfileResponseMapper(data);
};

export const sendFriendRequest = async ({
  req,
}: {
  req: ApiRequestSendFriendRequest;
}) => {
  await axios({
    method: 'POST',
    url: USERS_ENDPOINT + '/send-friend-request',
    data: toSendFriendRequestMapper(req),
  });
};

export const acceptFriendRequest = async ({
  req,
}: {
  req: ApiRequestAcceptFriendRequest;
}) => {
  await axios({
    method: 'POST',
    url: USERS_ENDPOINT + '/accept-friend-request',
    data: toAcceptFriendRequestMapper(req),
  });
};

export const rejectFriendRequest = async ({
  req,
}: {
  req: ApiRequestRejectFriendRequest;
}) => {
  await axios({
    method: 'POST',
    url: USERS_ENDPOINT + '/reject-friend-request',
    data: toRejectFriendRequestMapper(req),
  });
};

export const deleteFriend = async ({
  id,
  friendId,
}: {
  id: number;
  friendId: number;
}) => {
  await axios({
    method: 'DELETE',
    url: USERS_ENDPOINT + '/id/' + id + '/friends/' + friendId,
  });
};
