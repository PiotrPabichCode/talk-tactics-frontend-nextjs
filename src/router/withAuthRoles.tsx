'use client';
import { Spinner } from '@/components/ui/spinner';
import useAuthStore from '@/store/useAuthStore';
import useUserStore from '@/store/useUserStore';
import { IAuthRole } from '@/typings/auth';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

function hasRequiredPermissions(
  roles: string[] | 'skip',
  role: string = 'none'
): boolean {
  if (roles === 'skip') {
    return true;
  }
  return roles.includes(role);
}

enum DefaultFallback {
  /**
   * Push to login page if user is not authenticated
   * @example ENDPOINT: /profile
   */
  all,
  /**
   * Available only for not authenticated users
   * @example ENDPOINT: /auth
   */
  auth,
  /**
   * Doesn't push to login page if user is not authenticated
   */
  optional,
}

export default function withAuthRoles(
  Component: any,
  requiredRoles: IAuthRole[] | 'skip',
  defaultFallback: keyof typeof DefaultFallback,
  skipLoader?: boolean
) {
  return function isAuth(props: any) {
    const authStore = useAuthStore();
    const initialLoading = useUserStore().loading;
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState<undefined | string>(
      undefined
    );

    useEffect(() => {
      if (initialLoading) {
        return;
      }

      const { credentials } = authStore;
      const hasPermission = hasRequiredPermissions(
        requiredRoles,
        credentials?.role
      );

      if (defaultFallback === 'all' && !hasPermission) {
        console.log('Redirect to auth page');
        setRedirectPath('/auth');
      }

      if (defaultFallback === 'auth' && credentials?.role) {
        console.log('Redirects to profile page');
        setRedirectPath('/profile');
      }
      setLoading(false);
    }, [authStore, initialLoading]);

    if (loading) {
      if (skipLoader) {
        return null;
      }
      return (
        <div className='flex min-h-screen flex-col items-center justify-center text-white'>
          <Spinner />
          <p>Loading...</p>
        </div>
      );
    }

    if (redirectPath) {
      return redirect(redirectPath);
    }

    return <Component {...props} />;
  };
}
