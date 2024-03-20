'use client';

import { useState } from 'react';
import { LoginForm } from './_components/login-form';
import { RegisterForm } from './_components/register-form';

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthPage() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
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
