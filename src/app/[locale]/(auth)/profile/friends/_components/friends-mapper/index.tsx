import { Spinner } from '@/components/ui/spinner';
import { useTranslations } from '@/i18n';
import { useGetFriendList } from '@/services/queries/user/user.query';
import useAuthStore from '@/store/useAuthStore';
import { FriendsTable } from './_components/friends-table';
import { Label } from '../_components/label';

export function FriendsMapper() {
  const t = useTranslations('UserProfile.Friends');
  const userId = useAuthStore().credentials?.uuid;
  const { data: friends, isPending, isError } = useGetFriendList(userId);

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <div>{t('friendsLoadingError')}</div>;
  }

  return (
    <div>
      <Label title={t('friendsTitle')} description={t('friendsDescription')} />
      <FriendsTable friends={friends} />
    </div>
  );
}
