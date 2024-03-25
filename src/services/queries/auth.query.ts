import { useMutation } from '@tanstack/react-query';
import { signIn, signUp, updateUser } from '../api/auth.service';
import { ApiRequestSignIn, ApiRequestSignUp } from '@/typings/auth';
import { ApiRequestUpdateUser } from '@/typings/user';

export const useSignInQuery = () => {
  return useMutation({
    mutationFn: async (req: ApiRequestSignIn) => {
      const res = await signIn(req);
      return res;
    },
    mutationKey: ['signIn'],
  });
};

export const useSignUpQuery = () => {
  return useMutation({
    mutationFn: async (req: ApiRequestSignUp) => {
      const res = await signUp(req);
      return res;
    },
    mutationKey: ['signUp'],
  });
};

export const useUpdateUserDetailsQuery = () => {
  return useMutation({
    mutationFn: async ({ id, updatedFields }: ApiRequestUpdateUser) => {
      const res = await updateUser({ id, updatedFields });
      return res;
    },
    mutationKey: ['updateUserDetails'],
  });
};
