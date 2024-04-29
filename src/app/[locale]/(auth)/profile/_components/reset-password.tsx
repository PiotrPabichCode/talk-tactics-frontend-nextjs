import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResetPassword() {
  return (
    <main className='flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8 dark:bg-gray-900'>
      <div className='w-full max-w-md'>
        <Card className='mx-auto'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl font-bold'>Reset Password</CardTitle>
            <CardDescription>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <div>Email</div>
                <div />
              </div>
              <Button className='w-full' type='submit'>
                Send Reset Email
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Remembered your password?
              <Link className='underline' href='#'>
                Go back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
