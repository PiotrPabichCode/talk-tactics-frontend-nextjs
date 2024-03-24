'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { toast } from '@/components/ui/use-toast';
import useAuthStore from '@/store/useAuthStore';
import useUserStore from '@/store/useUserStore';
import { isEqual, omitBy } from 'lodash';
import { useUpdateUserDetailsQuery } from '@/services/queries/auth.query';
import { UpdateUserDto } from '@/typings/user';

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z.string().email('Invalid email'),
  bio: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const credentials = useAuthStore().credentials;
  const { isPending, mutateAsync: updateUser } = useUpdateUserDetailsQuery();
  const { email, bio } = useUserStore();

  const defaultValues = {
    bio: bio,
    email: email,
    username: credentials?.username,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  async function onSubmit(data: ProfileFormValues) {
    const changedValues = omitBy(
      data,
      (value, key) => defaultValues[key as keyof ProfileFormValues] === value
    ) as Partial<UpdateUserDto>;
    try {
      if (!credentials) {
        throw new Error('Bad credentials');
      }
      await updateUser({ id: credentials.id, updateUserDto: changedValues });
      toast({
        title: 'User updated successfully',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(changedValues, null, 2)}
            </code>
          </pre>
        ),
      });
    } catch (e) {
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
        <Button type='submit' disabled={isPending}>
          Update profile
        </Button>
      </form>
    </Form>
  );
}
