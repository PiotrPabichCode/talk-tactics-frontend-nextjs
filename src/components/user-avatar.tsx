import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function UserAvatar({
  className = '',
  firstName = '',
  lastName = '',
  src = '/account-man.svg',
  style = undefined,
}: {
  className?: string;
  firstName?: string;
  lastName?: string;
  src?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Avatar
      className={cn(
        'h-10 w-10 border-solid border-2 dark:bg-slate-100',
        className
      )}
      style={style}>
      <AvatarImage src={src} alt={'User account placeholder'} />
      <AvatarFallback>
        {`${firstName[0]}${lastName[0]}`.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
