import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';
import { useGetSentFriendInvitationsQuery } from '@/services/queries/user.query';
import useAuthStore from '@/store/useAuthStore';
import { IFriendInvitationDetailsDto } from '@/typings/user';
import { SentInvitationsTable } from './_components/sent-invitations-table';
import { Label } from '../_components/label';

export function SentInvitationsMapper() {
  const t = useTranslations('UserProfile.Friends');
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
    return <div>{t('invitationsLoadingError')}</div>;
  }

  return (
    <>
      <Label
        title={t('sentInvitationsTitle')}
        description={t('sentInvitationsDescription')}
      />
      <SentInvitationsTable invitations={invitations} />
    </>
  );
}
