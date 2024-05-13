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
import { IFriendInvitationDetailsDto } from '@/typings/user';

export function ReceivedInvitationsTable({
  invitations,
}: {
  invitations: IFriendInvitationDetailsDto[];
}) {
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
          {invitations.map((invitation) => (
            <TableRow
              key={invitation.sender.id}
              className='cursor-pointer hover:text-blue-500'
              onClick={() => router.push(`/profiles/${invitation.sender.id}`)}>
              <TableCell>
                <Link href={`/profiles/${invitation.sender.id}`}>
                  {invitation.sender.firstName}
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/profiles/${invitation.sender.id}`}>
                  {invitation.sender.lastName}
                </Link>
              </TableCell>
              <TableCell>
                <div className='flex gap-2'>
                  <FriendInvitationButton
                    status='ACCEPT_INVITATION'
                    buttonText={t('accept')}
                    isAccountPage
                    friendId={invitation.sender.id}
                  />
                  <FriendInvitationButton
                    status='REJECT_INVITATION'
                    buttonText={t('reject')}
                    isAccountPage
                    friendId={invitation.sender.id}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
