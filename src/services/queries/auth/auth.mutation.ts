import { useMutation } from '@tanstack/react-query';
import { signIn, signUp } from '../../api/auth.service';
import { ApiRequestSignIn, ApiRequestSignUp } from '@/typings/auth';

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: (req: ApiRequestSignIn) => signIn(req),
    mutationKey: ['signIn'],
  });
};

export const useSignUpQuery = () => {
  return useMutation({
    mutationFn: (req: ApiRequestSignUp) => signUp(req),
    mutationKey: ['signUp'],
  });
};
