import { Message } from "./userType";

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

export interface CreateTweetType {
  type: TweetType;
  audience: TweetAudience;
  content: string;
  parent_id: null | string;
  hashtags: string[];
  mentions: string[];
  medias: Media[];
  // file: File[];
}
