'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import useAuthStore from '@/store/useAuthStore';
import useCourseStore from '@/store/useCourseStore';
import useUserStore from '@/store/useUserStore';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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
        <Button
          variant='link'
          className='relative h-10 w-10 rounded-full border-solid border-2 bg-slate-100'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={'/account-man.svg'}
              alt={'User account placeholder'}
            />
            <AvatarFallback>
              {`${firstName[0]}${lastName[0]}`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
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
