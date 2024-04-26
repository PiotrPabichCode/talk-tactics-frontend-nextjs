import { axios } from '@/lib/axios';
import useUserStore from '@/store/useUserStore';
import {
  ApiRequestAcceptFriendInvitation,
  ApiRequestGetUserDetails,
  ApiRequestRejectFriendInvitation,
  ApiRequestSendFriendInvitation,
  ApiRequestUpdateUser,
  ApiResponseGetUserDetails,
  ApiResponseGetFriendList,
  ApiResponseGetUserProfile,
  ApiResponseGetUserProfilePreviews,
  ApiResponseUpdateUser,
  toAcceptFriendInvitationRequestMapper,
  toGetUserDetailsResponseMapper,
  toGetUserProfileResponseMapper,
  toGetUserProfilesResponseMapper,
  toRejectFriendInvitationRequestMapper,
  toSendFriendInvitationRequestMapper,
  toUpdateUserRequestMapper,
  toUpdateUserResponseMapper,
  ApiRequestDeleteFriend,
  toDeleteFriendRequestMapper,
  ApiResponseGetReceivedFriendInvitations,
  toGetReceivedFriendInvitationsResponseMapper,
  toGetSentFriendInvitationsResponseMapper,
  ApiResponseGetSentFriendInvitations,
  ApiRequestDeleteSentFriendInvitation,
  toDeleteSentFriendInvitationRequestMapper,
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

export const getFriendList = async ({ id }: { id: number }) => {
  const { data } = await axios<ApiResponseGetFriendList>({
    method: 'GET',
    url: USERS_ENDPOINT + '/id/' + id + '/friends',
  });

  return toGetUserProfilesResponseMapper(data);
};

export const sendFriendInvitation = async ({
  req,
}: {
  req: ApiRequestSendFriendInvitation;
}) => {
  await axios({
    method: 'POST',
    url: USERS_ENDPOINT + '/send-friend-invitation',
    data: toSendFriendInvitationRequestMapper(req),
  });
};

export const acceptFriendInvitation = async ({
  req,
}: {
  req: ApiRequestAcceptFriendInvitation;
}) => {
  await axios({
    method: 'POST',
    url: USERS_ENDPOINT + '/accept-friend-invitation',
    data: toAcceptFriendInvitationRequestMapper(req),
  });
};

export const rejectFriendInvitation = async ({
  req,
}: {
  req: ApiRequestRejectFriendInvitation;
}) => {
  await axios({
    method: 'POST',
    url: USERS_ENDPOINT + '/reject-friend-invitation',
    data: toRejectFriendInvitationRequestMapper(req),
  });
};

export const deleteFriend = async ({
  req,
}: {
  req: ApiRequestDeleteFriend;
}) => {
  await axios({
    method: 'DELETE',
    url: USERS_ENDPOINT + '/delete-friend',
    data: toDeleteFriendRequestMapper(req),
  });
};

export const getReceivedFriendInvitations = async ({ id }: { id: number }) => {
  const { data } = await axios<ApiResponseGetReceivedFriendInvitations>({
    method: 'GET',
    url: USERS_ENDPOINT + '/id/' + id + '/received-friend-invitations',
  });
  return toGetReceivedFriendInvitationsResponseMapper(data);
};

export const getSentFriendInvitations = async ({ id }: { id: number }) => {
  const { data } = await axios<ApiResponseGetSentFriendInvitations>({
    method: 'GET',
    url: USERS_ENDPOINT + '/id/' + id + '/sent-friend-invitations',
  });
  return toGetSentFriendInvitationsResponseMapper(data);
};

export const deleteSentFriendInvitation = async ({
  req,
}: {
  req: ApiRequestDeleteSentFriendInvitation;
}) => {
  await axios({
    method: 'DELETE',
    url: USERS_ENDPOINT + '/delete-sent-friend-invitation',
    data: toDeleteSentFriendInvitationRequestMapper(req),
  });
};
