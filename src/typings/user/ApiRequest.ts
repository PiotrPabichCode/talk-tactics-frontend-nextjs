import { z } from 'zod';
import {
  IApiDeleteFriendDto,
  IApiFriendRequestDto,
  IDeleteFriendDto,
  IFriendRequestDto,
} from './user';

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

export const toFriendRequestMapper = ({
  receiverId: friendId,
  senderId: userId,
  status,
}: IFriendRequestDto): IApiFriendRequestDto => {
  return {
    sender_id: userId,
    receiver_id: friendId,
    ...(status && { status }),
  };
};

export type ApiRequestSendFriendRequest = IFriendRequestDto;
export const toSendFriendRequestMapper = toFriendRequestMapper;

export type ApiRequestAcceptFriendRequest = IFriendRequestDto;
export const toAcceptFriendRequestMapper = toFriendRequestMapper;

export type ApiRequestRejectFriendRequest = IFriendRequestDto;
export const toRejectFriendRequestMapper = toFriendRequestMapper;

export type ApiRequestDeleteFriend = IDeleteFriendDto;

export type ApiRequestDeleteSentFriendRequest = IFriendRequestDto;
export const toDeleteSentFriendRequestMapper = toFriendRequestMapper;

export const toDeleteFriendRequestMapper = ({
  userId,
  friendId,
}: ApiRequestDeleteFriend): IApiDeleteFriendDto => {
  return {
    user_id: userId,
    friend_id: friendId,
  };
};
