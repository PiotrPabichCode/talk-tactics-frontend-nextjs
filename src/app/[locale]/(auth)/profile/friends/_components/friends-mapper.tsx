import { FriendInvitationButton } from '@/components/friend-invitation-button';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from '@/components/ui/table';
import { useTranslations } from '@/i18n';
import { Link, useRouter } from '@/navigation';
import { useGetFriendList } from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';

export function FriendsMapper() {
  const t = useTranslations('UserProfile.Friends');
  const router = useRouter();
  const userId = useAuthStore().credentials?.id;
  const { data: friends, isPending, isError } = useGetFriendList(userId);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{t('friendsLoadingError')}</div>;
  }

  return (
    <>
      <Separator className='mt-4 mb-3' />
      <h3
        className='text-lg font-medium animate-fade-up'
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        {t('friendsTitle')}
      </h3>
      <p
        className='text-sm text-muted-foreground animate-fade-up'
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {t('friendsDescription')}
      </p>
      <div
        className='p-1 w-full lg:w-[1000px] max-w-6xl mb-2 animate-fade-up'
        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('firstName')}</TableHead>
              <TableHead>{t('lastName')}</TableHead>
              <TableHead>{t('action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friends.map((friend) => (
              <TableRow
                key={friend.id}
                className='cursor-pointer hover:text-blue-500'
                onClick={() => router.push(`/profiles/${friend.id}`)}>
                <TableCell>
                  <Link href={`/profiles/${friend.id}`}>
                    {friend.firstName}
                  </Link>
                </TableCell>

                <TableCell>
                  <Link href={`/profiles/${friend.id}`}>{friend.lastName}</Link>
                </TableCell>
                <TableCell>
                  <FriendInvitationButton
                    status='DELETE_FRIEND'
                    buttonText={t('delete')}
                    isAccountPage
                    friendId={friend.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
