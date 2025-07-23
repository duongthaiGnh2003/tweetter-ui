export interface Message {
  message: string;
}
export interface AuthTypes extends Message {
  data: { accessToken: string; refreshToken: string };
}
