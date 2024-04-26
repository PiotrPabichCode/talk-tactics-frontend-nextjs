import { IFriendInvitationDto } from '@/typings/user';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export function FriendRequestActionDialog({
  status,
  isOpen,
  onOpenChange,
  onAction,
}: {
  status: 'FRIENDS' | 'PENDING' | 'SENT' | undefined;
  isOpen: boolean;
  onOpenChange: (_: boolean) => void;
  onAction: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === 'PENDING'
              ? 'Accept friend request'
              : status === 'SENT'
              ? 'Delete friend request'
              : status === 'FRIENDS'
              ? 'Delete friend'
              : 'Send friend request'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {status === 'PENDING'
              ? 'Are you sure you want to accept this friend request?'
              : status === 'SENT'
              ? 'Are you sure you want to delete this friend request?'
              : status === 'FRIENDS'
              ? 'Are you sure you want to delete this friend?'
              : 'Are you sure you want to send a friend request?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
            }}>
            No
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
