'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from '@/i18n';
import { Link } from '@/navigation';
import useAuthStore from '@/store/useAuthStore';
import useCourseStore from '@/store/useCourseStore';
import useUserStore from '@/store/useUserStore';
import { UserAvatar } from './user-avatar';

export default function UserNav() {
  const { credentials, logout } = useAuthStore();
  const clearUserCourses = useCourseStore().clearUserCourses;
  const clearUser = useUserStore().clearUser;
  const { firstName, lastName, email } = useUserStore();
  const t = useTranslations('Navigation.User');
  const tCommon = useTranslations('Common');

  if (!credentials) {
    return (
      <Link href={'/auth'}>
        <Button variant='outline'>{tCommon('signIn')}</Button>
      </Link>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} size={'icon'} className='rounded-full'>
          <UserAvatar firstName={firstName} lastName={lastName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{`${firstName} ${lastName}`}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={'/profile'}>
            <DropdownMenuItem>
              {t('profile')}
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={'/profile/preferences'}>
            <DropdownMenuItem>
              {t('settings')}
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            clearUserCourses();
            clearUser();
            logout();
          }}>
          {t('logout')}
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
