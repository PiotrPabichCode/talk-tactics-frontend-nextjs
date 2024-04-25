import {
  UseQueryResult,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  acceptFriendRequest,
  deleteFriend,
  deleteSentFriendRequest,
  getFriendList,
  getReceivedFriendRequests,
  getSentFriendRequests,
  getUserProfileByUserId,
  getUserProfiles,
  rejectFriendRequest,
  sendFriendRequest,
  updateUser,
} from '../api/user.service';
import {
  ApiRequestAcceptFriendRequest,
  ApiRequestDeleteFriend,
  ApiRequestDeleteSentFriendRequest,
  ApiRequestRejectFriendRequest,
  ApiRequestSendFriendRequest,
  ApiRequestUpdateUser,
  IDeleteFriendDto,
  IFriendRequestDto,
  IUserProfile,
  IUserProfilePreview,
} from '@/typings/user';
import useAuthStore from '@/store/useAuthStore';

const UPDATE_USER_DETAILS_MUTATION_KEY = 'updateUserDetails';
const GET_USER_PROFILES_QUERY_KEY = 'getUserProfiles';
const GET_FRIEND_LIST_QUERY_KEY = 'getFriendList';
const SEND_FRIEND_REQUEST_MUTATION_KEY = 'sendFriendRequest';
const ACCEPT_FRIEND_REQUEST_MUTATION_KEY = 'acceptFriendRequest';
const REJECT_FRIEND_REQUEST_MUTATION_KEY = 'rejectFriendRequest';
const DELETE_FRIEND_MUTATION_KEY = 'deleteFriend';
const GET_RECEIVED_FRIEND_REQUESTS_QUERY_KEY = 'getReceivedFriendRequests';
const GET_SENT_FRIEND_REQUESTS_QUERY_KEY = 'getSentFriendRequests';
const DELETE_SENT_FRIEND_REQUESTS_QUERY_KEY = 'deleteSentFriendRequests';

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
    queryKey: [GET_FRIEND_LIST_QUERY_KEY],
    queryFn: id
      ? async () => {
          return await getFriendList({ id });
        }
      : skipToken,
    initialData: () => {
      return queryClient.getQueryData<IUserProfilePreview[]>([
        GET_FRIEND_LIST_QUERY_KEY,
      ]);
    },
  });
  return query;
};

export const useSendFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestSendFriendRequest) => {
      return await sendFriendRequest({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_REQUESTS_QUERY_KEY, userId],
      });
    },
    mutationKey: [SEND_FRIEND_REQUEST_MUTATION_KEY],
  });
};

export const useAcceptFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestAcceptFriendRequest) => {
      return await acceptFriendRequest({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_REQUESTS_QUERY_KEY, userId],
      });
    },
    mutationKey: [ACCEPT_FRIEND_REQUEST_MUTATION_KEY],
  });
};

export const useRejectFriendRequestMutation = () => {
  return useMutation({
    mutationFn: async (req: ApiRequestRejectFriendRequest) => {
      return await rejectFriendRequest({ req });
    },
    mutationKey: [REJECT_FRIEND_REQUEST_MUTATION_KEY],
  });
};

export const useDeleteFriendMutation = () => {
  return useMutation({
    mutationFn: async (req: ApiRequestDeleteFriend) => {
      return await deleteFriend({ req });
    },
    mutationKey: [DELETE_FRIEND_MUTATION_KEY],
  });
};

export const useGetReceivedFriendRequestsQuery = (
  id?: number
): UseQueryResult<IFriendRequestDto[]> => {
  const queryClient = useQueryClient();
  console.log(id);
  return useQuery<IFriendRequestDto[]>({
    queryKey: [GET_RECEIVED_FRIEND_REQUESTS_QUERY_KEY, id],
    queryFn: id
      ? async () => {
          return await getReceivedFriendRequests({ id });
        }
      : skipToken,
    initialData: () => {
      return queryClient.getQueryData<IFriendRequestDto[]>([
        GET_RECEIVED_FRIEND_REQUESTS_QUERY_KEY,
        id,
      ]);
    },
  });
};

export const useGetSentFriendRequestsQuery = (
  id?: number
): UseQueryResult<IFriendRequestDto[]> => {
  const queryClient = useQueryClient();
  return useQuery<IFriendRequestDto[]>({
    queryKey: [GET_SENT_FRIEND_REQUESTS_QUERY_KEY, id],
    queryFn: id
      ? async () => {
          return await getSentFriendRequests({ id });
        }
      : skipToken,
    initialData: () => {
      return queryClient.getQueryData<IFriendRequestDto[]>([
        GET_SENT_FRIEND_REQUESTS_QUERY_KEY,
        id,
      ]);
    },
  });
};

export const useDeleteSentFriendRequestMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.id;
  return useMutation({
    mutationFn: async (req: ApiRequestDeleteSentFriendRequest) => {
      return await deleteSentFriendRequest({ req });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_REQUESTS_QUERY_KEY, userId],
      });
    },
    mutationKey: [DELETE_SENT_FRIEND_REQUESTS_QUERY_KEY],
  });
};
