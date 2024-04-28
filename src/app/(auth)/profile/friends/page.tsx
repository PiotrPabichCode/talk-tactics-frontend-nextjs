'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  SentInvitationsMapper,
  FriendsMapper,
  ReceivedInvitationsMapper,
} from './_components';

export default function FriendsPage() {
  return (
    <div className='space-y-6'>
      <Tabs defaultValue='friends'>
        <TabsList>
          <TabsTrigger value='friends'>Friends</TabsTrigger>
          <TabsTrigger value='sent-invitations'>Sent invitations</TabsTrigger>
          <TabsTrigger value='received-invitations'>
            Received Invitations
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
    </div>
  );
}
