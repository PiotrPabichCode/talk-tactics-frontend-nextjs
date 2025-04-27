import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteFriend,
  handleFriendInvitation,
  updateUser,
} from '../../api/user.service';
import {
  ApiRequestDeleteFriend,
  ApiRequestFriendInvitation,
  ApiRequestUpdateUser,
} from '@/typings/user';
import useAuthStore from '@/store/useAuthStore';
import {
  GET_FRIEND_LIST_QUERY_KEY,
  GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY,
  GET_SENT_FRIEND_INVITATIONS_QUERY_KEY,
} from './user.query';

export const useUpdateUserDetailsMutation = () => {
  return useMutation({
    mutationFn: async ({ uuid, updatedFields }: ApiRequestUpdateUser) => {
      const res = await updateUser({ uuid, updatedFields });
      return res;
    },
    mutationKey: ['updateUserDetails'],
  });
};
export const useSendFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore().credentials?.uuid;
  return useMutation({
    mutationFn: async (req: ApiRequestFriendInvitation) => {
      return await handleFriendInvitation(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, userUuid],
      });
    },
    mutationKey: ['sendFriendInvitation'],
  });
};

export const useAcceptFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore().credentials?.uuid;
  return useMutation({
    mutationFn: async (req: ApiRequestFriendInvitation) => {
      return await handleFriendInvitation(req);
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
    mutationKey: ['acceptFriendInvitation'],
  });
};

export const useRejectFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore().credentials?.uuid;
  return useMutation({
    mutationFn: async (req: ApiRequestFriendInvitation) => {
      return await handleFriendInvitation(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, userUuid],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, userUuid],
      });
    },
    mutationKey: ['rejectFriendInvitation'],
  });
};

export const useDeleteFriendMutation = () => {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore().credentials?.uuid;
  return useMutation({
    mutationFn: async (req: ApiRequestDeleteFriend) => {
      return await deleteFriend(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_FRIEND_LIST_QUERY_KEY, userUuid],
      });
    },
    mutationKey: ['deleteFriend'],
  });
};

export const useDeleteSentFriendInvitationMutation = () => {
  const queryClient = useQueryClient();
  const userUuid = useAuthStore().credentials?.uuid;
  return useMutation({
    mutationFn: async (req: ApiRequestFriendInvitation) => {
      return await handleFriendInvitation(req);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_SENT_FRIEND_INVITATIONS_QUERY_KEY, userUuid],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_RECEIVED_FRIEND_INVITATIONS_QUERY_KEY, userUuid],
      });
    },
    mutationKey: ['deleteSentFriendInvitation'],
  });
};
