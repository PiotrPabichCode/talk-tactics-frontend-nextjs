import { z } from 'zod';

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
  uuid: string;
  updatedFields: UpdateUserFormValues;
}

export interface ApiRequestFriendInvitation {
  senderUuid: string;
  receiverUuid: string;
  action: 'SEND' | 'ACCEPT' | 'REJECT' | 'DELETE';
}
export interface ApiRequestDeleteFriend {
  userUuid: string;
  friendUuid: string;
}
