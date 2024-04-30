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
import { useTranslations } from '@/i18n';

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
  const t = useTranslations('FriendInvitationButton');
  const tCommon = useTranslations('Common');
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {status === 'SEND_INVITATION' && t('send')}
            {status === 'ACCEPT_INVITATION' && t('accept')}
            {status === 'REJECT_INVITATION' && t('reject')}
            {status === 'CANCEL_INVITATION' && t('cancel')}
            {status === 'DELETE_FRIEND' && t('delete')}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {status === 'SEND_INVITATION' && t('sendDescription')}
            {status === 'ACCEPT_INVITATION' && t('acceptDescription')}
            {status === 'REJECT_INVITATION' && t('rejectDescription')}
            {status === 'CANCEL_INVITATION' && t('cancelDescription')}
            {status === 'DELETE_FRIEND' && t('deleteDescription')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
            }}>
            {tCommon('no')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onAction}>
            {tCommon('yes')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
