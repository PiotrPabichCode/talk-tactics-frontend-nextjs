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

export function FriendInvitationActionDialog({
  status,
  isOpen,
  onOpenChange,
  onAction,
}: {
  status:
    | 'SEND_INVITATION'
    | 'ACCEPT_INVITATION'
    | 'REJECT_INVITATION'
    | 'CANCEL_INVITATION'
    | 'DELETE_FRIEND';
  isOpen: boolean;
  onOpenChange: (_: boolean) => void;
  onAction: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === 'SEND_INVITATION' && 'Send friend invitation'}
            {status === 'ACCEPT_INVITATION' && 'Accept friend invitation'}
            {status === 'REJECT_INVITATION' && 'Reject friend invitation'}
            {status === 'CANCEL_INVITATION' && 'Cancel friend invitation'}
            {status === 'DELETE_FRIEND' && 'Delete friend'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {status === 'SEND_INVITATION' &&
              'Are you sure you want to send a friend invitation?'}
            {status === 'ACCEPT_INVITATION' &&
              'Are you sure you want to accept this friend invitation?'}
            {status === 'REJECT_INVITATION' &&
              'Are you sure you want to reject this friend invitation?'}
            {status === 'CANCEL_INVITATION' &&
              'Are you sure you want to cancel this friend invitation?'}
            {status === 'DELETE_FRIEND' &&
              'Are you sure you want to delete this friend?'}
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
