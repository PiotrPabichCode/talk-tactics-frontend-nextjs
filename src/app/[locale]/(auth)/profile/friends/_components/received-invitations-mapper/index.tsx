import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';
import { useGetReceivedFriendInvitationsQuery } from '@/services/queries/user/user.query';
import useAuthStore from '@/store/useAuthStore';
import { ReceivedInvitationsTable } from './_components/received-invitations-table';
import { Label } from '../_components/label';

export function ReceivedInvitationsMapper() {
  const t = useTranslations('UserProfile.Friends');
  const userId = useAuthStore().credentials?.uuid!;
  const {
    data: invitations,
    isPending,
    isError,
  } = useGetReceivedFriendInvitationsQuery(userId);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{t('invitationsLoadingError')}</div>;
  }

  return (
    <div>
      <Label
        title={t('receivedInvitationsTitle')}
        description={t('receivedInvitationsDescription')}
      />
      <ReceivedInvitationsTable invitations={invitations} />
    </div>
  );
}
