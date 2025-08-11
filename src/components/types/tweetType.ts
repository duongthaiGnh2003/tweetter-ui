import { Message, UserType } from "./userType";

export enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet,
}
export enum TweetAudience {
  Everyone,
  TwiterCircle,
}
export enum MediaType {
  Image,
  Video,
  HLS,
}
export type Media = {
  url: string;
  type: MediaType;
};

export interface mediaResponse extends Message {
  data: Media[];
}
interface Pagination {
  limit: number;
  page: number;
  total_page: number;
}

export interface CreateTweetType {
  type: TweetType;
  audience: TweetAudience;
  content: string;
  parent_id: null | string;
  hashtags: string[];
  mentions: string[];
  medias: Media[];
}
type hashtags = {
  _id: string;
  name: string;
  created_at: Date;
};

export interface TweetPostType {
  audience: TweetAudience;
  bookmarks: number;
  comment_counts: number;
  content: string;
  created_at: Date;
  guest_views: number;
  hashtags: hashtags[];
  likes: number;
  medias: Media[];
  mentions: string[];
  parent_id: string | null;
  quote_counts: number;
  retweet_counts: number;
  type: TweetType;
  updated_at: Date;
  user: UserType;
  _id: string;
}

export interface resTweetPostType extends Message {
  data: Pagination & {
    tweets: TweetPostType[];
  };
}
