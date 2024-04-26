import {
  UseQueryResult,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  acceptFriendInvitation,
  deleteFriend,
  deleteSentFriendInvitation,
  getFriendList,
  getReceivedFriendInvitations,
  getSentFriendInvitations,
  getUserProfileByUserId,
  getUserProfiles,
  rejectFriendInvitation,
  sendFriendInvitation,
  updateUser,
} from '../api/user.service';
import {
  ApiRequestAcceptFriendInvitation,
  ApiRequestDeleteFriend,
  ApiRequestDeleteSentFriendInvitation,
  ApiRequestRejectFriendInvitation,
  ApiRequestSendFriendInvitation,
  ApiRequestUpdateUser,
  IFriendInvitationDto,
  IUserProfile,
  IUserProfilePreview,
} from '@/typings/user';
import useAuthStore from '@/store/useAuthStore';

const UPDATE_USER_DETAILS_MUTATION_KEY = 'updateUserDetails';
const GET_USER_PROFILES_QUERY_KEY = 'getUserProfiles';
const GET_FRIEND_LIST_QUERY_KEY = 'getFriendList';
const SEND_FRIEND_INVITATION_MUTATION_KEY = 'sendFriendInvitation';
const ACCEPT_FRIEND_INVITATION_MUTATION_KEY = 'acceptFriendInvitation';
const REJECT_FRIEND_INVITATION_MUTATION_KEY = 'rejectFriendInvitation';
const DELETE_FRIEND_MUTATION_KEY = 'deleteFriend';
const GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY =
  'getReceivedFriendInvitations';
const GET_SENT_FRIEND_INVITATIONS_QUERY_KEY = 'getSentFriendInvitations';
const DELETE_SENT_FRIEND_INVITATIONS_QUERY_KEY = 'deleteSentFriendInvitations';

export const useUpdateUserDetailsMutation = () => {
  return useMutation({
    mutationFn: async ({ id, updatedFields }: ApiRequestUpdateUser) => {
      const res = await updateUser({ id, updatedFields });
      return res;
    },
    mutationKey: [UPDATE_USER_DETAILS_MUTATION_KEY],
  });
};

export const useGetUserProfilePreviews = (): UseQueryResult<
  IUserProfilePreview[]
> => {
  const queryClient = useQueryClient();
  const query = useQuery<IUserProfilePreview[]>({
    queryKey: [GET_USER_PROFILES_QUERY_KEY],
    queryFn: async () => {
      return await getUserProfiles();
    },
    initialData: () => {
      return queryClient.getQueryData<IUserProfilePreview[]>([
        GET_USER_PROFILES_QUERY_KEY,
      ]);
    },
  });
  return query;
};

export const useGetUserProfile = (id: number) => {
  const queryClient = useQueryClient();
  const query = useQuery<IUserProfile>({
    queryKey: [GET_USER_PROFILES_QUERY_KEY, id],
    queryFn: async () => {
      return await getUserProfileByUserId({ id });
    },
    initialData: () => {
      return queryClient.getQueryData<IUserProfile>([
        GET_USER_PROFILES_QUERY_KEY,
        id,
      ]);
    },
  });
  return query;
};

export const useGetFriendList = (
  id?: number
): UseQueryResult<IUserProfilePreview[]> => {
  const queryClient = useQueryClient();
  const query = useQuery<IUserProfilePreview[]>({
    queryKey: [GET_FRIEND_LIST_QUERY_KEY, id],
    queryFn: id
      ? async () => {
          return await getFriendList({ id });
        }
      : skipToken,
    initialData: () => {
      return queryClient.getQueryData<IUserProfilePreview[]>([
        GET_FRIEND_LIST_QUERY_KEY,
        id,
      ]);
    },
  });
  return query;
};

export const useSendFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestSendFriendInvitation) => {
      return await sendFriendInvitation({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, userId],
      });
    },
    mutationKey: [SEND_FRIEND_INVITATION_MUTATION_KEY],
  });
};

export const useAcceptFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestAcceptFriendInvitation) => {
      return await acceptFriendInvitation({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_FRIEND_LIST_QUERY_KEY, userId],
      });
    },
    mutationKey: [ACCEPT_FRIEND_INVITATION_MUTATION_KEY],
  });
};

export const useRejectFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestRejectFriendInvitation) => {
      return await rejectFriendInvitation({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, userId],
      });
    },
    mutationKey: [REJECT_FRIEND_INVITATION_MUTATION_KEY],
  });
};

export const useDeleteFriendMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestDeleteFriend) => {
      return await deleteFriend({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_FRIEND_LIST_QUERY_KEY, userId],
      });
    },
    mutationKey: [DELETE_FRIEND_MUTATION_KEY],
  });
};

export const useGetReceivedFriendInvitationsQuery = (
  id?: number,
  withDetails?: boolean
): UseQueryResult<IFriendInvitationDto[]> => {
  const queryClient = useQueryClient();
  return useQuery<IFriendInvitationDto[]>({
    queryKey: withDetails
      ? [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, id, withDetails]
      : [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, id],
    queryFn: id
      ? async () => {
          return await getReceivedFriendInvitations({ id });
        }
      : skipToken,
    initialData: () => {
      return queryClient.getQueryData<IFriendInvitationDto[]>(
        withDetails
          ? [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, id, withDetails]
          : [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, id]
      );
    },
  });
};

export const useGetSentFriendInvitationsQuery = (
  id?: number,
  withDetails?: boolean
): UseQueryResult<IFriendInvitationDto[]> => {
  const queryClient = useQueryClient();
  return useQuery<IFriendInvitationDto[]>({
    queryKey: withDetails
      ? [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, id, withDetails]
      : [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, id],
    queryFn: id
      ? async () => {
          return await getSentFriendInvitations({ id });
        }
      : skipToken,
    initialData: () => {
      return queryClient.getQueryData<IFriendInvitationDto[]>(
        withDetails
          ? [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, id, withDetails]
          : [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, id]
      );
    },
  });
};

export const useDeleteSentFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestDeleteSentFriendInvitation) => {
      return await deleteSentFriendInvitation({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, userId],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, userId],
      });
    },
    mutationKey: [DELETE_SENT_FRIEND_INVITATIONS_QUERY_KEY],
  });
};
