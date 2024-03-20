import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAuthStore from '@/store/useAuthStore';
import { useSignInQuery } from '@/services/queries/auth.query';
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

const loginSchema = z.object({
  login: z.string().min(1, { message: 'Login is required' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters' }),
});

const defaultValues = {
  login: '',
  password: '',
};

type FieldValues = z.infer<typeof loginSchema>;

export function LoginForm({ toggleVariant }: { toggleVariant: () => void }) {
  const {
    actions: { setUser },
  } = useAuthStore((state) => state);
  const { isPending, mutateAsync: signIn } = useSignInQuery();

  const form = useForm<FieldValues>({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const response = await signIn(data);
      setUser(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='m-4 overflow-y-auto items-center text-center'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>Sign in</CardTitle>
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
            <div className={'grid gap-4'}>
              <FormField
                name='login'
                control={form.control}
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
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isPending}>
              Login
            </Button>
          </CardFooter>
          <CardFooter
            className='
          flex 
          text-sm
          gap-2
          justify-center
          '>
            <div>New to TalkTactics?</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              Create an account
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
