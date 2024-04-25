import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  useDeleteFriendMutation,
  useDeleteSentFriendRequestMutation,
  useSendFriendRequestMutation,
} from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';
import { IFriendRequestDto } from '@/typings/user';
import { Loader, UserCheck, UserPlus, Users } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { FriendRequestActionDialog } from './FriendRequestActionDialog';

export function FriendRequestButton({
  friendId,
  status,
}: {
  friendId: number;
  status?: IFriendRequestDto['status'];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    isPending: isPendingSendFriendRequest,
    mutateAsync: sendFriendRequest,
  } = useSendFriendRequestMutation();
  const {
    isPending: isPendingDeleteFriendRequest,
    mutateAsync: deleteSentFriendRequest,
  } = useDeleteSentFriendRequestMutation();
  const { isPending: isPendingDeleteFriend, mutateAsync: deleteFriend } =
    useDeleteFriendMutation();
  const userId = useAuthStore().credentials?.id;
  const isPending =
    isPendingSendFriendRequest ||
    isPendingDeleteFriendRequest ||
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
          } else if (status === 'PENDING') {
            await deleteSentFriendRequest({
              senderId: userId,
              receiverId: friendId,
            });
            toast.success('Friend request deleted');
          } else if (status === 'ACCEPTED') {
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
          'absolute top-0 right-0',
          status === 'ACCEPTED' && 'bg-green-700'
        )}>
        {isAnimating ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <>
            {status === 'PENDING' && <UserCheck className='w-4 h-4' />}
            {status === 'ACCEPTED' && <Users className='w-4 h-4' />}
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
