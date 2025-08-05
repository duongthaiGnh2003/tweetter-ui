import { useMutation } from "@tanstack/react-query";

import { CreateTweetType } from "~/components/types/tweetType";
import { createTweetService, uploadMediaService } from "~/service/TweetService";

const useCreateTweet = () => {
  return useMutation({
    mutationFn: (data: CreateTweetType) => createTweetService(data),
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
export { useCreateTweet, useUploadMedia };
