import { useMutation } from '@tanstack/react-query';
import { type SignInBody, type SignUpBody } from '@/types/auth';
import { signIn, signUp } from '../api/auth.service';

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
