import {
  UseQueryResult,
  skipToken,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getFriendList,
  getReceivedFriendInvitations,
  getSentFriendInvitations,
  getUserProfileByUserUuid,
  getUserProfiles,
} from '../../api/user.service';
import {
  UserProfile,
  UserProfilePreview,
  ApiResponseGetSentFriendInvitations,
  ApiResponseGetReceivedFriendInvitations,
} from '@/typings/user';

export const GET_USER_PROFILES_QUERY_KEY = 'getUserProfiles';
export const GET_FRIEND_LIST_QUERY_KEY = 'getFriendList';
export const GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY =
  'getReceivedFriendInvitations';
export const GET_SENT_FRIEND_INVITATIONS_QUERY_KEY = 'getSentFriendInvitations';

export const useGetUserProfilePreviews = () => {
  const queryClient = useQueryClient();
  const query = useQuery<UserProfilePreview[], Error>({
    queryKey: [GET_USER_PROFILES_QUERY_KEY],
    queryFn: async () => {
      return await getUserProfiles();
    },
    initialData: () => {
      return queryClient.getQueryData<UserProfilePreview[]>([
        GET_USER_PROFILES_QUERY_KEY,
      ]) as UserProfilePreview[];
    },
  });
  return query;
};

export const useGetUserProfile = (userUuid: string) => {
  const queryClient = useQueryClient();
  const query = useQuery<UserProfile, Error>({
    queryKey: [GET_USER_PROFILES_QUERY_KEY, userUuid],
    queryFn: async () => {
      return await getUserProfileByUserUuid({ uuid: userUuid });
    },
    initialData: () => {
      return queryClient.getQueryData<UserProfile>([
        GET_USER_PROFILES_QUERY_KEY,
        userUuid,
      ]) as UserProfile;
    },
  });
  return query;
};

export const useGetFriendList = (
  userUuid?: string
): UseQueryResult<UserProfilePreview[]> => {
  const queryClient = useQueryClient();
  const query = useQuery<UserProfilePreview[]>({
    queryKey: [GET_FRIEND_LIST_QUERY_KEY, userUuid],
    queryFn: userUuid
      ? async () => {
          return await getFriendList({ uuid: userUuid });
        }
      : skipToken,
    initialData: () => {
      return queryClient.getQueryData<UserProfilePreview[]>([
        GET_FRIEND_LIST_QUERY_KEY,
        userUuid,
      ]);
    },
  });
  return query;
};

export function useGetReceivedFriendInvitationsQuery(uuid: string) {
  const queryClient = useQueryClient();
  return useQuery<ApiResponseGetReceivedFriendInvitations, Error>({
    queryKey: [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, uuid],
    queryFn: () => getReceivedFriendInvitations(uuid),
    initialData: () => {
      return queryClient.getQueryData([
        GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY,
        uuid,
      ]) as ApiResponseGetReceivedFriendInvitations;
    },
  });
}

export function useGetSentFriendInvitationsQuery(uuid: string) {
  const queryClient = useQueryClient();
  return useQuery<ApiResponseGetSentFriendInvitations, Error>({
    queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, uuid],
    queryFn: () => getSentFriendInvitations(uuid),
    initialData: () => {
      return queryClient.getQueryData([
        GET_SENT_FRIEND_INVITATIONS_QUERY_KEY,
        uuid,
      ]) as ApiResponseGetSentFriendInvitations;
    },
  });
}
