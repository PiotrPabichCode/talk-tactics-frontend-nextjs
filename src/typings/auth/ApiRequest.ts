import { z } from 'zod';

export const ApiRequestSignInSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

export type SignInFormValues = z.infer<typeof ApiRequestSignInSchema>;

export type ApiRequestSignIn = SignInFormValues;

export const ApiRequestSignUpSchema = z
  .object({
    username: z.string().min(2, { message: 'Username is required' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters' }),
    repeatPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters' }),
    firstName: z.string().min(2, { message: 'First name is required' }),
    lastName: z.string().min(2, { message: 'Last name is required' }),
    email: z.string().min(2, { message: 'Email is required' }).email(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ['repeatPassword'], // path of error
  });

export type SignUpFormValues = z.infer<typeof ApiRequestSignUpSchema>;
export type ApiRequestSignUp = SignUpFormValues;
