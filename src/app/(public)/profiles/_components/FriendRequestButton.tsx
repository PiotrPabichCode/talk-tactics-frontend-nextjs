import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  useAcceptFriendInvitationMutation,
  useDeleteFriendMutation,
  useDeleteSentFriendInvitationMutation,
  useSendFriendInvitationMutation,
} from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';
import { Loader, UserCheck, UserPlus, Users } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { FriendRequestActionDialog } from './FriendRequestActionDialog';

export function FriendRequestButton({
  friendId,
  status,
}: {
  friendId: number;
  status: 'FRIENDS' | 'PENDING' | 'SENT' | undefined;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    isPending: isPendingSendFriendRequest,
    mutateAsync: sendFriendRequest,
  } = useSendFriendInvitationMutation();
  const {
    isPending: isPendingDeleteFriendRequest,
    mutateAsync: deleteSentFriendRequest,
  } = useDeleteSentFriendInvitationMutation();
  const { isPending: isPendingDeleteFriend, mutateAsync: deleteFriend } =
    useDeleteFriendMutation();
  const {
    isPending: isPendingAcceptFriendRequest,
    mutateAsync: acceptFriendRequest,
  } = useAcceptFriendInvitationMutation();
  const userId = useAuthStore().credentials?.id;
  const isPending =
    isPendingSendFriendRequest ||
    isPendingDeleteFriendRequest ||
    isPendingAcceptFriendRequest ||
    isPendingDeleteFriend;

  const [isAnimating, startTransition] = useTransition();

  const onFriendRequestAction = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      e.stopPropagation();
      if (userId) {
        startTransition(async () => {
          if (!status) {
            await sendFriendRequest({ senderId: userId, receiverId: friendId });
            toast.success('Friend request sent');
          } else if (status === 'SENT') {
            await deleteSentFriendRequest({
              senderId: userId,
              receiverId: friendId,
            });
            toast.success('Friend request deleted');
          } else if (status === 'PENDING') {
            await acceptFriendRequest({
              senderId: friendId,
              receiverId: userId,
            });
            toast.success('Friend added');
          } else if (status === 'FRIENDS') {
            await deleteFriend({
              userId,
              friendId,
            });
            toast.success('Friend deleted');
          }
        });
      }
    } catch (e) {
      // toast.error('Oh no! Something went wrong.', {
      //   description: 'There was a problem with your request',
      // });
      console.error(e);
    }
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDialogOpen(true);
        }}
        variant={'ghost'}
        className={cn(
          'absolute top-0 right-0 border-green-500 hover:bg-green-500',
          status === 'FRIENDS' && 'border-2',
          status === 'PENDING' && 'border-2',
          status === 'SENT' && 'border-2'
        )}>
        {isAnimating ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <>
            {status === 'SENT' && <UserCheck className='w-4 h-4' />}
            {status === 'PENDING' && <UserPlus className='w-4 h-4' />}
            {status === 'FRIENDS' && <Users className='w-4 h-4' />}
            {!status && <UserPlus className='w-4 h-4' />}
          </>
        )}
      </Button>
      <FriendRequestActionDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        status={status}
        onAction={onFriendRequestAction}
      />
    </>
  );
}
