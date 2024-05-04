import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUpQuery } from '@/services/queries/auth.query';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ApiRequestSignUpSchema, SignUpFormValues } from '@/typings/auth';
import { toast } from 'sonner';
import { useTranslations } from '@/i18n';
import { handleError } from '@/services/common';

const defaultValues: SignUpFormValues = {
  username: '',
  password: '',
  repeatPassword: '',
  firstName: '',
  lastName: '',
  email: '',
};

export function RegisterForm({ toggleVariant }: { toggleVariant: () => void }) {
  const { isPending, mutateAsync: signUp } = useSignUpQuery();
  const t = useTranslations('AuthPage.registerForm');
  const form = useForm<SignUpFormValues>({
    defaultValues,
    resolver: zodResolver(ApiRequestSignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await signUp(data);
      toast.success(t('signUpSuccess'));
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='animate-fade-up'
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        <Card className='m-4 overflow-y-auto items-center text-center'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>{t('title')}</CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            {/* <div className='grid md:grid-cols-2 gap-6'>
              <Button variant='outline'>
                <Icons.gitHub className='mr-2 h-4 w-4' />
                Github
              </Button>
              <Button variant='outline'>
                <Icons.google className='mr-2 h-4 w-4' />
                Google
              </Button>
            </div> */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  {t('or')}
                </span>
              </div>
            </div>
            <div className={'grid gap-4 md:grid-cols-2'}>
              <FormField
                name='username'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('username')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('usernamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('password')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('passwordPlaceholder')}
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='repeatPassword'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('repeatPassword')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('passwordPlaceholder')}
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
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('emailPlaceholder')}
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
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('firstName')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('firstNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='lastName'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('lastName')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('lastNamePlaceholder')}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isPending}>
              {t('signUpButton')}
            </Button>
          </CardFooter>
          <CardFooter
            className='
          flex 
          text-sm
          gap-2
          justify-center
          '>
            <div>{t('exists')}</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              {t('login')}
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
