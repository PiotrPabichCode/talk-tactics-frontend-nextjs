import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';
import { useGetReceivedFriendInvitationsQuery } from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';
import { IFriendInvitationDetailsDto } from '@/typings/user';
import { ReceivedInvitationsTable } from './_components/received-invitations-table';
import { Label } from '../_components/label';

export function ReceivedInvitationsMapper() {
  const t = useTranslations('UserProfile.Friends');
  const userId = useAuthStore().credentials?.id;
  const {
    data: invitations,
    isPending,
    isError,
  } = useGetReceivedFriendInvitationsQuery<IFriendInvitationDetailsDto[]>(
    userId,
    true
  );

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
