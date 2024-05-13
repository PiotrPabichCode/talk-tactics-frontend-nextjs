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

export function SentInvitationsTable({
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
              key={invitation.receiver.id}
              className='cursor-pointer hover:text-blue-500'
              onClick={() =>
                router.push(`/profiles/${invitation.receiver.id}`)
              }>
              <TableCell>
                <Link href={`/profiles/${invitation.receiver.id}`}>
                  {invitation.receiver.firstName}
                </Link>
              </TableCell>

              <TableCell>
                <Link href={`/profiles/${invitation.receiver.id}`}>
                  {invitation.receiver.lastName}
                </Link>
              </TableCell>
              <TableCell>
                <FriendInvitationButton
                  status='CANCEL_INVITATION'
                  buttonText={t('cancel')}
                  isAccountPage
                  friendId={invitation.receiver.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
