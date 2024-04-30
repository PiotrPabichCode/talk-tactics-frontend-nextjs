'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  useAcceptFriendInvitationMutation,
  useDeleteFriendMutation,
  useDeleteSentFriendInvitationMutation,
  useRejectFriendInvitationMutation,
  useSendFriendInvitationMutation,
} from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';
import { Loader, UserPlus, UserX } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { FriendInvitationActionDialog } from './_components/friend-invitation-action-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslations } from '@/i18n';

export function FriendInvitationButton({
  friendId,
  status,
  ...props
}: {
  friendId: number;
  status:
    | 'SEND_INVITATION'
    | 'ACCEPT_INVITATION'
    | 'REJECT_INVITATION'
    | 'CANCEL_INVITATION'
    | 'DELETE_FRIEND';
  isAccountPage?: boolean;
  className?: string;
  buttonText?: string;
}) {
  const t = useTranslations('FriendInvitationButton');
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const { isAccountPage, className, buttonText } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync: sendFriendInvitation } =
    useSendFriendInvitationMutation();
  const { mutateAsync: acceptFriendInvitation } =
    useAcceptFriendInvitationMutation();
  const { mutateAsync: rejectFriendInvitation } =
    useRejectFriendInvitationMutation();
  const { mutateAsync: cancelFriendInvitation } =
    useDeleteSentFriendInvitationMutation();
  const { mutateAsync: deleteFriend } = useDeleteFriendMutation();
  const userId = useAuthStore().credentials?.id;

  const [isAnimating, startTransition] = useTransition();

  const onFriendInvitationAction = async (e: React.MouseEvent<HTMLElement>) => {
    try {
      e.stopPropagation();
      if (userId) {
        startTransition(async () => {
          if (status === 'SEND_INVITATION') {
            await sendFriendInvitation({
              senderId: userId,
              receiverId: friendId,
            });
            toast.success(t('sendSuccess'));
          } else if (status === 'ACCEPT_INVITATION') {
            await acceptFriendInvitation({
              senderId: friendId,
              receiverId: userId,
            });
            toast.success(t('acceptSuccess'));
          } else if (status === 'REJECT_INVITATION') {
            await rejectFriendInvitation({
              senderId: friendId,
              receiverId: userId,
            });
            toast.success(t('rejectSuccess'));
          } else if (status === 'CANCEL_INVITATION') {
            await cancelFriendInvitation({
              senderId: userId,
              receiverId: friendId,
            });
            toast.success(t('cancelSuccess'));
          } else if (status === 'DELETE_FRIEND') {
            await deleteFriend({
              userId,
              friendId,
            });
            toast.success(t('deleteSuccess'));
          }
        });
      }
    } catch (e) {
      toast.error('Oh no! Something went wrong.', {
        description: 'There was a problem with your request',
      });
      console.error(e);
    }
  };

  return (
    <>
      <Button
        disabled={isAnimating}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDialogOpen(true);
        }}
        variant={'ghost'}
        className={cn(
          'border-green-500 hover:bg-green-500 hover:text-white',
          !isAccountPage && 'absolute top-0 right-0',
          status && 'border-2',
          className
        )}>
        {isAnimating && <Loader className='w-4 h-4 animate-spin' />}
        {!isAnimating && buttonText && (
          <p className='hidden md:block'>{buttonText}</p>
        )}
        {!isAnimating && (!buttonText || isSmallDevice) && (
          <>
            {['SEND_INVITATION', 'ACCEPT_INVITATION'].includes(status) && (
              <UserPlus className='w-4 h-4' />
            )}
            {[
              'REJECT_INVITATION',
              'CANCEL_INVITATION',
              'DELETE_FRIEND',
            ].includes(status) && <UserX className='w-4 h-4' />}
          </>
        )}
      </Button>
      <FriendInvitationActionDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        status={status}
        onAction={onFriendInvitationAction}
      />
    </>
  );
}
