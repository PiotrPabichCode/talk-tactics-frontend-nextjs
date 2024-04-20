export interface IAuthUser {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
}

export interface IApiAuthUser {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
}

export interface IUserProfile {
  id: number;
  fullName: string;
  totalPoints: number;
  bio: string;
}

export interface IApiUserProfile {
  id: number;
  full_name: string;
  total_points: number;
  bio: string;
}
