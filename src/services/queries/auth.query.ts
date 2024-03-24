import { useMutation } from '@tanstack/react-query';
import { type SignInBody, type SignUpBody } from '@/typings/auth';
import { signIn, signUp, updateUser } from '../api/auth.service';
import { UpdateUserDto } from '@/typings/user';

export const useSignInQuery = () => {
  return useMutation({
    mutationFn: async (body: SignInBody) => {
      const res = await signIn(body);
      return res;
    },
    mutationKey: ['signIn'],
  });
};

export const useSignUpQuery = () => {
  return useMutation({
    mutationFn: async (body: SignUpBody) => {
      const res = await signUp(body);
      return res;
    },
    mutationKey: ['signUp'],
  });
};

export const useUpdateUserDetailsQuery = () => {
  return useMutation({
    mutationFn: async ({
      id,
      updateUserDto,
    }: {
      id: number;
      updateUserDto: Partial<UpdateUserDto>;
    }) => {
      const res = await updateUser({ id, updateUserDto });
      return res;
    },
    mutationKey: ['updateUserDetails'],
  });
};
