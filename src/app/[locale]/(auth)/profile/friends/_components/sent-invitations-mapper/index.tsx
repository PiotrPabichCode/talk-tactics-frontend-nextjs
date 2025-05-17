import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';
import { useGetSentFriendInvitationsQuery } from '@/services/queries/user/user.query';
import useAuthStore from '@/store/useAuthStore';
import { SentInvitationsTable } from './_components/sent-invitations-table';
import { Label } from '../_components/label';

export function SentInvitationsMapper() {
  const t = useTranslations('UserProfile.Friends');
  const userId = useAuthStore().credentials?.uuid!;
  const {
    data: invitations,
    isFetching,
    isError,
  } = useGetSentFriendInvitationsQuery(userId);

  if (isFetching) {
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
