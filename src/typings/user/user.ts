import { CourseParticipant } from '../course';

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export interface UserProfilePreview {
  uuid: string;
  firstName: string;
  lastName: string;
  totalPoints: number;
  bio: string;
}

export interface UserProfile extends UserProfilePreview {
  courses: CourseParticipant[];
}

export interface FriendInvitation {
  sender: UserProfilePreview;
  receiver: UserProfilePreview;
}
