'use client';
import { Spinner } from '@/components/ui/spinner';
import { getUserDetails } from '@/services/api/auth.service';
import { getCourses } from '@/services/api/course.service';
import useAuthStore, { IAuthStore } from '@/store/useAuthStore';
import useCourseStore from '@/store/useCourseStore';
import useStore from '@/store/useStore';
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
    const authStore = useStore<IAuthStore, IAuthStore>(
      useAuthStore,
      (state) => state
    );
    const [loading, setLoading] = useState(true);
    const [redirectPath, setRedirectPath] = useState<undefined | string>(
      undefined
    );
    const [rehydrate, setRehydrate] = useState(false);

    useEffect(() => {
      const loadData = async () => {
        if (!authStore) {
          return;
        }

        /**
         * Manual rehydrate store when available
         * @example https://docs.pmnd.rs/zustand/integrations/persisting-store-data#usage-in-next.js
         */
        if (!rehydrate) {
          await useAuthStore.persist.rehydrate();
          setRehydrate(true);
          return;
        }

        const { credentials } = authStore;

        /**
         * START LOADING
         * Local storage loaded => load:
         * - courses,
         * - userDetails
         */
        const courses = useCourseStore.getState().courses;
        if (courses) {
          await getCourses();
        }

        const user = useUserStore.getState();
        if (credentials?.username && user.loading) {
          await getUserDetails({ username: credentials.username });
        }
        /**
         * END LOADING
         */

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
      };

      loadData();
    }, [authStore]);

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
