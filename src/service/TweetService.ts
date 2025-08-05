import { CreateFormType } from "~/app/(page)/_components/CreatePost";
import { CreateTweetType, mediaResponse } from "~/components/types/tweetType";
import HttpService from "~/config/http-service";
import { TWEET } from "~/lib/endpoints";

const API = HttpService.getInstance();
export function createTweetService(data: CreateTweetType) {
  const res = API.post(TWEET, data);
  return res;
}
export function uploadMediaService(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file", file);
  });
  const res = API.post<mediaResponse>(
    "/medias/upload-media-clound?mode=1",
    formData
  );
  return res;
}
