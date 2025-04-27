import { FriendInvitationButton } from '@/components/friend-invitation-button';
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
import { type UserProfilePreview } from '@/typings/user';

export function FriendsTable({ friends }: { friends: UserProfilePreview[] }) {
  const t = useTranslations('UserProfile.Friends');
  const router = useRouter();
  return (
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
              key={friend.uuid}
              className='cursor-pointer hover:text-blue-500'
              onClick={() => router.push(`/profiles/${friend.uuid}`)}>
              <TableCell>
                <Link href={`/profiles/${friend.uuid}`}>
                  {friend.firstName}
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/profiles/${friend.uuid}`}>{friend.lastName}</Link>
              </TableCell>
              <TableCell>
                <FriendInvitationButton
                  status='DELETE_FRIEND'
                  buttonText={t('delete')}
                  isAccountPage
                  friendUuid={friend.uuid}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
