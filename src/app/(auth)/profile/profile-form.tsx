'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useAuthStore from '@/store/useAuthStore';
import useUserStore from '@/store/useUserStore';
import { isEqual, omitBy } from 'lodash';
import { useUpdateUserDetailsQuery } from '@/services/queries/auth.query';
import {
  ApiRequestUpdateUser,
  ApiRequestUpdateUserSchema,
  UpdateUserFormValues,
} from '@/typings/user';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';

export function ProfileForm() {
  const credentials = useAuthStore().credentials;
  const { isPending, mutateAsync: updateUser } = useUpdateUserDetailsQuery();
  const userDetails = useUserStore();
  const { email, firstName, lastName, bio } = userDetails;
  const [enableSubmit, setEnableSubmit] = useState(false);

  if (!userDetails) {
    return <Spinner />;
  }

  let defaultValues = {
    username: credentials?.username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    bio: bio ?? '',
  };
  console.log('AFTER');

  let form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(ApiRequestUpdateUserSchema),
    defaultValues,
    mode: 'onChange',
  });

  useEffect(() => {
    const isNew = !isEqual(defaultValues, form.getValues());
    if (isNew) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [defaultValues]);

  async function onSubmit(data: UpdateUserFormValues) {
    const changedValues = omitBy(
      data,
      (value, key) => defaultValues[key as keyof UpdateUserFormValues] === value
    ) as ApiRequestUpdateUser['updatedFields'];
    try {
      if (!credentials) {
        throw new Error('Bad credentials');
      }
      await updateUser({ id: credentials.id, updatedFields: changedValues });
      toast.success('You have successfully updated your profile!');
    } catch (e) {
      toast.error('Oh no! Something went wrong.', {
        description: 'There was a problem with your request',
      });
      console.error(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or
                nickname. This is also your login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input {...field} />
              <FormDescription>
                This email address will be your primary contact. We will use it
                to send notifications, confirmation emails and password change
                requests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <Input {...field} />
              <FormDescription>
                Type in your given name. This is how you&apos;ll be addressed
                across our platform.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <Input {...field} />
              <FormDescription>
                Enter your surname as you&apos;d like it to appear on your
                profile.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Tell us a little bit about yourself'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={cn(!enableSubmit && 'hidden')}
          type='submit'
          disabled={isPending || !enableSubmit}>
          Update profile
        </Button>
      </form>
    </Form>
  );
}
