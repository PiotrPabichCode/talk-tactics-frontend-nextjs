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
import { useGetSentFriendInvitationsQuery } from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';
import { IFriendInvitationDetailsDto } from '@/typings/user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function SentInvitationsMapper() {
  const router = useRouter();
  const userId = useAuthStore().credentials?.id;
  const {
    data: invitations,
    isPending,
    isError,
  } = useGetSentFriendInvitationsQuery<IFriendInvitationDetailsDto[]>(
    userId,
    true
  );

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error loading sent invitations</div>;
  }

  return (
    <>
      <Separator className='mt-4 mb-3' />
      <h3
        className='text-lg font-medium animate-fade-up'
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        Sent invitations
      </h3>
      <p
        className='text-sm text-muted-foreground animate-fade-up'
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        Here you can see the list of invitations you&apos;ve sent to other
        users.
      </p>
      <div
        className='p-1 w-full lg:w-[1000px] max-w-6xl mb-2 animate-fade-up'
        style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First name</TableHead>
              <TableHead>Last name</TableHead>
              <TableHead>Action</TableHead>
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
                    buttonText='Cancel'
                    isAccountPage
                    friendId={invitation.receiver.id}
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
