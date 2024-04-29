import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInMutation } from '@/services/queries/auth.query';
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
import { ApiRequestSignInSchema, SignInFormValues } from '@/typings/auth';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';

const defaultValues: SignInFormValues = {
  username: '',
  password: '',
};

export function LoginForm({ toggleVariant }: { toggleVariant: () => void }) {
  const { isPending, mutateAsync: signIn } = useSignInMutation();
  const t = useTranslations('AuthPage.loginForm');
  const form = useForm<SignInFormValues>({
    defaultValues,
    resolver: zodResolver(ApiRequestSignInSchema),
  });
  const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
    try {
      await signIn(data);
      toast.success(t('signInSuccess'));
    } catch (e) {
      toast.error('Oh no! Something went wrong.', {
        description: 'There was a problem with your request',
      });
      console.error(e);
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
                {/* <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span> */}
              </div>
            </div>
            <Card className='text-sm text-muted-foreground border-none'>
              <p>Test account</p>
              <p>Login: user1</p>
              <p>Password: user1</p>
            </Card>
            <span className='w-full border-t' />
            <div className={'grid gap-4'}>
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
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isPending}>
              {isPending ? <Spinner variant='button' /> : t('signInButton')}
            </Button>
          </CardFooter>
          <CardFooter
            className='
          flex 
          text-sm
          gap-2
          justify-center
          '>
            <div>{t('new')}</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              {t('createAccount')}
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
