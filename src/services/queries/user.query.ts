import {
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  acceptFriendRequest,
  deleteFriend,
  getUserProfileByUserId,
  getUserProfiles,
  rejectFriendRequest,
  sendFriendRequest,
  updateUser,
} from '../api/user.service';
import {
  ApiRequestAcceptFriendRequest,
  ApiRequestRejectFriendRequest,
  ApiRequestSendFriendRequest,
  ApiRequestUpdateUser,
  IUserProfile,
  IUserProfilePreview,
} from '@/typings/user';

const UPDATE_USER_DETAILS_MUTATION_KEY = 'updateUserDetails';
const GET_USER_PROFILES_QUERY_KEY = 'getUserProfiles';
const SEND_FRIEND_REQUEST_MUTATION_KEY = 'sendFriendRequest';
const ACCEPT_FRIEND_REQUEST_MUTATION_KEY = 'acceptFriendRequest';
const REJECT_FRIEND_REQUEST_MUTATION_KEY = 'rejectFriendRequest';
const DELETE_FRIEND_MUTATION_KEY = 'deleteFriend';

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

export const useSendFriendRequestMutation = () => {
  return useMutation({
    mutationFn: async (req: ApiRequestSendFriendRequest) => {
      return await sendFriendRequest({ req });
    },
    mutationKey: [SEND_FRIEND_REQUEST_MUTATION_KEY],
  });
};

export const useAcceptFriendRequestMutation = () => {
  return useMutation({
    mutationFn: async (req: ApiRequestAcceptFriendRequest) => {
      return await acceptFriendRequest({ req });
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
    mutationFn: async ({ id, friendId }: { id: number; friendId: number }) => {
      return await deleteFriend({ id, friendId });
    },
    mutationKey: [DELETE_FRIEND_MUTATION_KEY],
  });
};
