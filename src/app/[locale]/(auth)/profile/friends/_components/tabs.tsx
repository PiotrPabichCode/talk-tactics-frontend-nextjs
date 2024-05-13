import { FriendsMapper } from './friends-mapper';
import { ReceivedInvitationsMapper } from './received-invitations-mapper';
import { SentInvitationsMapper } from './sent-invitations-mapper';

export type FriendsTab = {
  value: string;
  label: 'friends' | 'sentInvitations' | 'receivedInvitations';
  mapper: JSX.Element;
};

export const friendsTabs: FriendsTab[] = [
  { value: 'friends', label: 'friends', mapper: <FriendsMapper /> },
  {
    value: 'sent-invitations',
    label: 'sentInvitations',
    mapper: <SentInvitationsMapper />,
  },
  {
    value: 'received-invitations',
    label: 'receivedInvitations',
    mapper: <ReceivedInvitationsMapper />,
  },
];
