export interface Message {
  message: string;
}
export interface AuthTypes extends Message {
  data: { accessToken: string; refreshToken: string };
}
export enum UserVerifyStatus {
  Unverified,
  Verified,
  Banned,
}
export interface UserType {
  avatar: string;
  bio: string;
  cover_photo: string;
  created_at: Date;
  date_of_birth: Date;
  email: string;
  location: string;
  name: string;
  twitter_circle: [];
  updated_at: Date;
  username: string;
  verify: UserVerifyStatus;
  website: string;
  _id: string;
}
