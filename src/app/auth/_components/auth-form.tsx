'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useSignInQuery, useSignUpQuery } from '@/services/queries/auth.query';
import useAuthStore from '@/store/useAuthStore';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { SignUpBody } from '@/types/auth';

const loginSchema = z.object({
  login: z.string().min(1, { message: 'Login is required' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

const registerSchema = z
  .object({
    login: z.string().min(1, { message: 'Login is required' }),
    password: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters' }),
    repeatPassword: z
      .string()
      .min(4, { message: 'Password must be at least 4 characters' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().min(1, { message: 'Email is required' }).email(),
  })
  .superRefine(({ repeatPassword, password }, ctx) => {
    if (repeatPassword && repeatPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

const defaultValues = {
  login: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
  email: '',
};

type Variant = 'LOGIN' | 'REGISTER';

export function AuthForm() {
  const {
    actions: { setIsAuthenticated },
  } = useAuthStore((state) => state);
  const { isPending: signInPending, mutateAsync: signIn } = useSignInQuery();
  const { isPending: signUpPending, mutateAsync: signUp } = useSignUpQuery();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [schema, setSchema] = useState<
    typeof loginSchema | typeof registerSchema
  >(loginSchema);

  const form = useForm<FieldValues>({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });

  console.log(form.formState.errors);

  const toggleVariant = useCallback(() => {
    form.reset();
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
      setSchema(registerSchema);
    } else {
      setVariant('LOGIN');
      setSchema(loginSchema);
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (variant === 'REGISTER') {
        await signUp(data as SignUpBody);
      } else if (variant === 'LOGIN') {
        await signIn({
          login: data.login,
          password: data.password,
        });
      }
      setIsAuthenticated(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Card className='m-4 overflow-y-auto items-center text-center'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl'>
          {variant === 'LOGIN' ? 'Sign in' : 'Create an account'}
        </CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <div className='grid md:grid-cols-2 gap-6'>
          <Button variant='outline'>
            <Icons.gitHub className='mr-2 h-4 w-4' />
            Github
          </Button>
          <Button variant='outline'>
            <Icons.google className='mr-2 h-4 w-4' />
            Google
          </Button>
        </div>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
              'grid gap-4',
              variant === 'REGISTER' && 'md:grid-cols-2'
            )}>
            <FormField
              name='login'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input placeholder='Your login' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder='********' type='password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {variant === 'REGISTER' && (
              <>
                <FormField
                  name='repeatPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repeat Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='********'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='ppabich1@gmail.com'
                          type='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder='Your first name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='lastName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder='Your last name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button
          type='submit'
          className='w-full'
          disabled={signInPending || signUpPending}>
          {variant === 'LOGIN' ? 'Login' : 'Create an account'}
        </Button>
      </CardFooter>
      <CardFooter
        className='
          flex 
          text-sm
          gap-2
          justify-center
          '>
        <div>
          {variant === 'LOGIN'
            ? 'New to TalkTactics?'
            : 'Already have an account?'}
        </div>
        <div onClick={toggleVariant} className='underline cursor-pointer'>
          {variant === 'LOGIN' ? 'Create an account' : 'Login'}
        </div>
      </CardFooter>
    </Card>
  );
}
