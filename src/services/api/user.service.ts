import { axios } from '@/lib/axios';
import useUserStore from '@/store/useUserStore';
import {
  ApiRequestUpdateUser,
  ApiResponseGetUserDetails,
  ApiResponseGetFriendList,
  ApiResponseGetUserProfile,
  ApiResponseGetUserProfilePreviews,
  ApiResponseUpdateUser,
  ApiRequestFriendInvitation,
  ApiRequestDeleteFriend,
  ApiResponseGetReceivedFriendInvitations,
  ApiResponseGetSentFriendInvitations,
} from '@/typings/user';

const USERS = '/users';

export const getUserDetails = async (username: string) => {
  const { data } = await axios<ApiResponseGetUserDetails>({
    method: 'GET',
    url: `${USERS}/username/${username}`,
  });
  useUserStore.getState().setUserDetails(data);
};

export const updateUser = async ({
  uuid,
  updatedFields,
}: ApiRequestUpdateUser) => {
  const { data } = await axios<ApiResponseUpdateUser>({
    method: 'PATCH',
    url: `${USERS}/${uuid}`,
    data: updatedFields,
  });
  useUserStore.getState().setUserDetails(data);
};

export const getUserProfiles = async () => {
  const { data } = await axios<ApiResponseGetUserProfilePreviews>({
    method: 'GET',
    url: `${USERS}/profiles`,
  });
  return data;
};

export const getUserProfileByUserUuid = async ({ uuid }: { uuid: string }) => {
  const { data } = await axios<ApiResponseGetUserProfile>({
    method: 'GET',
    url: `${USERS}/profiles/${uuid}`,
  });
  return data;
};

export const getFriendList = async ({ uuid }: { uuid: string }) => {
  const { data } = await axios<ApiResponseGetFriendList>({
    method: 'GET',
    url: `${USERS}/${uuid}/friends`,
  });

  return data;
};

export const handleFriendInvitation = async (
  req: ApiRequestFriendInvitation
) => {
  await axios({
    method: 'POST',
    url: `${USERS}/friend-invitation`,
    data: req,
  });
};

export const deleteFriend = async (req: ApiRequestDeleteFriend) => {
  await axios({
    method: 'DELETE',
    url: `${USERS}/delete-friend`,
    data: req,
  });
};

export const getReceivedFriendInvitations = async (uuid: string) => {
  const { data } = await axios<ApiResponseGetReceivedFriendInvitations>({
    method: 'GET',
    url: `${USERS}/${uuid}/friend-invitations?type=RECEIVED`,
  });
  return data;
};

export const getSentFriendInvitations = async (uuid: string) => {
  const { data } = await axios<ApiResponseGetSentFriendInvitations>({
    method: 'GET',
    url: `${USERS}/${uuid}/friend-invitations?type=SENT`,
  });
  return data;
};
