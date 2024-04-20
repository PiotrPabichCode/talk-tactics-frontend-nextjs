import { useMutation } from '@tanstack/react-query';
import { signIn, signUp } from '../api/auth.service';
import { ApiRequestSignIn, ApiRequestSignUp } from '@/typings/auth';

export const useSignInMutation = () => {
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
