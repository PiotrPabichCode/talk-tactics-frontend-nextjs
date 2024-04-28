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
import { useGetFriendList } from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function FriendsMapper() {
  const router = useRouter();
  const userId = useAuthStore().credentials?.id;
  const { data: friends, isPending, isError } = useGetFriendList(userId);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error loading friends</div>;
  }

  return (
    <>
      <Separator className='mt-4 mb-3' />
      <h3
        className='text-lg font-medium animate-fade-up'
        style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
        Friends
      </h3>
      <p
        className='text-sm text-muted-foreground animate-fade-up'
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        Here you can see the list of you&apos;re friends.
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
                    buttonText='Delete'
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
