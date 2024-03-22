'use client';

import { useLayoutEffect, useState } from 'react';
import { LoginForm } from './_components/login-form';
import { RegisterForm } from './_components/register-form';
import useAuthStore from '@/store/useAuthStore';
import { redirect } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

function AuthPage() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  useLayoutEffect(() => {
    const credentials = !!useAuthStore.getState().credentials;
    if (credentials) {
      redirect('/');
    }
  }, []);
  return (
    <div className='h-full flex items-center justify-center'>
      {variant === 'LOGIN' ? (
        <LoginForm toggleVariant={() => setVariant('REGISTER')} />
      ) : (
        <RegisterForm toggleVariant={() => setVariant('LOGIN')} />
      )}
    </div>
  );
}

export default AuthPage;
