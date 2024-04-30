'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  SentInvitationsMapper,
  FriendsMapper,
  ReceivedInvitationsMapper,
} from './_components';
import { useTranslations } from '@/i18n';

export default function FriendsPage() {
  const t = useTranslations('UserProfile.Friends');
  return (
    <Tabs
      defaultValue='friends'
      className='overflow-scroll md:overflow-visible'>
      <TabsList>
        <TabsTrigger value='friends'>{t('friends')}</TabsTrigger>
        <TabsTrigger value='sent-invitations'>
          {t('sentInvitations')}
        </TabsTrigger>
        <TabsTrigger value='received-invitations'>
          {t('receivedInvitations')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value='friends'>
        <FriendsMapper />
      </TabsContent>
      <TabsContent value='sent-invitations'>
        <SentInvitationsMapper />
      </TabsContent>
      <TabsContent value='received-invitations'>
        <ReceivedInvitationsMapper />
      </TabsContent>
    </Tabs>
  );
}
