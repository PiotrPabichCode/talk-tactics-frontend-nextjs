'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import useAuthStore from '@/store/useAuthStore';
import useUserStore from '@/store/useUserStore';
import { isEqual } from 'lodash';
import {
  ApiRequestUpdateUserSchema,
  UpdateUserFormValues,
} from '@/typings/user';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';
import { handleError } from '@/services/common';
import { SubmitButton } from '@/components/submit-button';
import { getChangedValues } from '@/lib/utils';
import { FormInput } from '@/components/form/form-input';
import { FormTextarea } from '@/components/form/form-textarea';
import { useUpdateUserDetailsMutation } from '@/services/queries/user/user.mutation';

export function ProfileForm() {
  const credentials = useAuthStore().credentials;
  const t = useTranslations('UserProfile.Settings');
  const { isPending, mutateAsync: updateUser } = useUpdateUserDetailsMutation();
  const { email, firstName, lastName, bio, isReady } = useUserStore();
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formValues, setFormValues] = useState<UpdateUserFormValues>({
    username: credentials?.username ?? '',
    email: email,
    firstName: firstName,
    lastName: lastName,
    bio: bio ?? '',
  });
  let form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(ApiRequestUpdateUserSchema),
    defaultValues: formValues,
    mode: 'onChange',
  });
  const watchAllFields = form.watch();

  useEffect(() => {
    const isNew = isEqual(formValues, watchAllFields);
    setEnableSubmit(!isNew);
  }, [watchAllFields, formValues]);

  if (!isReady) {
    return <Spinner />;
  }

  async function onSubmit(data: UpdateUserFormValues) {
    try {
      const changedValues = getChangedValues<UpdateUserFormValues>(
        formValues,
        data
      );
      if (!credentials) {
        throw new Error('Bad credentials');
      }
      await updateUser({
        uuid: credentials.uuid,
        updatedFields: changedValues,
      });
      toast.success(t('successMessage'));
      setFormValues(data);
    } catch (e) {
      handleError(e);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormInput
          name='username'
          label={t('username')}
          description={t('usernameDescription')}
          control={form.control}
          disabled
        />
        <FormInput
          name='firstName'
          label={t('firstName')}
          description={t('firstNameDescription')}
          control={form.control}
        />
        <FormInput
          name='lastName'
          label={t('lastName')}
          description={t('lastNameDescription')}
          control={form.control}
        />
        <FormTextarea
          name='bio'
          label={t('bio')}
          description={t('bioDescription')}
          placeholder={t('bioPlaceholder')}
          control={form.control}
        />
        <SubmitButton
          enabled={enableSubmit}
          disabled={isPending || !enableSubmit}
          title={t('buttonSubmit')}
        />
      </form>
    </Form>
  );
}
