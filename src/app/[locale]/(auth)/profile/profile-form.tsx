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
import { useUpdateUserDetailsMutation } from '@/services/queries/user.query';
import {
  ApiRequestUpdateUser,
  ApiRequestUpdateUserSchema,
  UpdateUserFormValues,
} from '@/typings/user';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';
import { handleError } from '@/services/common';
import { useFormValuesChanged } from '@/hooks/use-form-values-changed';

export function ProfileForm() {
  const credentials = useAuthStore().credentials;
  const t = useTranslations('UserProfile.Settings');
  const { isPending, mutateAsync: updateUser } = useUpdateUserDetailsMutation();
  const { email, firstName, lastName, bio, isReady } = useUserStore();
  const [enableSubmit, setEnableSubmit] = useState(false);
  let defaultValues = {
    username: credentials?.username,
    email: email,
    firstName: firstName,
    lastName: lastName,
    bio: bio ?? '',
  };
  let form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(ApiRequestUpdateUserSchema),
    defaultValues,
    mode: 'onChange',
  });

  useMemo(() => {
    if (isReady) {
      defaultValues = {
        username: credentials?.username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        bio: bio ?? '',
      };
      form.reset(defaultValues);
    }
  }, [isReady]);

  useFormValuesChanged(form, () => {
    const isNew = !isEqual(defaultValues, form.getValues());
    setEnableSubmit(isNew);
  });

  if (!isReady) {
    return <Spinner />;
  }

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
      toast.success(t('successMessage'));
    } catch (e) {
      handleError(e);
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
              <FormLabel>{t('username')}</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormDescription>{t('usernameDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <Input {...field} />
              <FormDescription>{t('emailDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('firstName')}</FormLabel>
              <Input {...field} />
              <FormDescription>{t('firstNameDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('lastName')}</FormLabel>
              <Input {...field} />
              <FormDescription>{t('lastNameDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('bio')}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t('bioPlaceholder')}
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormDescription>{t('bioDescription')}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className={cn(!enableSubmit && 'hidden')}
          type='submit'
          disabled={isPending || !enableSubmit}>
          {t('buttonSubmit')}
        </Button>
      </form>
    </Form>
  );
}
