import { z } from 'zod';
import { IApiDeleteFriendDto, IDeleteFriendDto } from './user';

export interface ApiRequestGetUserDetails {
  username: string;
}

export const ApiRequestUpdateUserSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z.string().email('Invalid email'),
  firstName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 30 characters.',
    }),
  lastName: z
    .string()
    .min(2, {
      message: 'Surname must be at least 2 characters.',
    })
    .max(30, {
      message: 'Surname must not be longer than 30 characters.',
    }),
  bio: z.string().max(160).min(4),
});

export type UpdateUserFormValues = z.infer<typeof ApiRequestUpdateUserSchema>;

export interface ApiRequestUpdateUser {
  id: number;
  updatedFields: UpdateUserFormValues;
}

export const toUpdateUserRequestMapper = ({
  firstName,
  lastName,
  email,
  bio,
}: ApiRequestUpdateUser['updatedFields']) => {
  return {
    first_name: firstName,
    last_name: lastName,
    email: email,
    bio: bio,
  };
};

export interface ApiRequestFriendInvitation {
  senderId: number;
  receiverId: number;
}

export const toFriendInvitationRequestMapper = ({
  receiverId,
  senderId,
}: ApiRequestFriendInvitation) => {
  return {
    receiver_id: receiverId,
    sender_id: senderId,
  };
};

export type ApiRequestSendFriendInvitation = ApiRequestFriendInvitation;
export const toSendFriendInvitationRequestMapper =
  toFriendInvitationRequestMapper;

export type ApiRequestAcceptFriendInvitation = ApiRequestFriendInvitation;
export const toAcceptFriendInvitationRequestMapper =
  toFriendInvitationRequestMapper;

export type ApiRequestRejectFriendInvitation = ApiRequestFriendInvitation;
export const toRejectFriendInvitationRequestMapper =
  toFriendInvitationRequestMapper;

export type ApiRequestDeleteSentFriendInvitation = ApiRequestFriendInvitation;
export const toDeleteSentFriendInvitationRequestMapper =
  toFriendInvitationRequestMapper;

export type ApiRequestDeleteFriend = IDeleteFriendDto;
export const toDeleteFriendRequestMapper = ({
  userId,
  friendId,
}: ApiRequestDeleteFriend): IApiDeleteFriendDto => {
  return {
    user_id: userId,
    friend_id: friendId,
  };
};
