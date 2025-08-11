import { useMutation, useQuery } from "@tanstack/react-query";

import { CreateTweetType } from "~/components/types/tweetType";
import {
  createTweetService,
  getNewFeedService,
  uploadMediaService,
} from "~/service/TweetService";

const useCreateTweet = () => {
  return useMutation({
    mutationFn: (data: CreateTweetType) => createTweetService(data),
    networkMode: "always",
    retryDelay: 3000,
  });
};

const useGetNewFeedTweet = (limit: number, page: number) => {
  return useQuery({
    queryKey: ["newFeed"],
    queryFn: () => getNewFeedService(limit, page),
    networkMode: "always",
    retryDelay: 3000,
  });
};

const useUploadMedia = () => {
  return useMutation({
    mutationFn: (file: File[]) => uploadMediaService(file),
    networkMode: "always",
    retryDelay: 3000,
  });
};
export { useCreateTweet, useUploadMedia, useGetNewFeedTweet };
