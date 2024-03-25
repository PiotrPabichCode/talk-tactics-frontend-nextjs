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
  const form = useForm<SignUpFormValues>({
    defaultValues,
    resolver: zodResolver(ApiRequestSignUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    try {
      await signUp(data);
      toast.success('You have successfully registered!');
    } catch (e) {
      toast.error('Oh no! Something went wrong.', {
        description: 'There was a problem with your request',
      });
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className='m-4 overflow-y-auto items-center text-center'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>Create an account</CardTitle>
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
            <div className={'grid gap-4 md:grid-cols-2'}>
              <FormField
                name='username'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='Your username' {...field} />
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
              <FormField
                name='repeatPassword'
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
            </div>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full' disabled={isPending}>
              Create an account
            </Button>
          </CardFooter>
          <CardFooter
            className='
          flex 
          text-sm
          gap-2
          justify-center
          '>
            <div>Already have an account?</div>
            <div onClick={toggleVariant} className='underline cursor-pointer'>
              Login
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
