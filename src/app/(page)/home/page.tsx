"use client";

import { useState } from "react";
import { PostViewMode } from "~/components/enum";
import { useGetCurrentUser } from "~/hook/userUser";
import { cn } from "~/lib/utils";

import TweetPostItem from "../_components/home/Tweet";
import { useGetNewFeedTweet } from "~/hook/useTweet";
import CreatePost from "../_components/home/CreatePost";

function Home() {
  const { data } = useGetCurrentUser();
  const { data: newFeed } = useGetNewFeedTweet(10, 1);

  const [mode, setMode] = useState<PostViewMode>(PostViewMode.ForYou);
  return (
    <div>
      {data && (
        <div className="border-l border-r border-[#2f3336] w-[600px] h-screen overflow-y-scroll scrollbar-hide">
          <div className=" flex justify-center text-center text-[15px] items-center text-secondary border-b border-[#2f3336]">
            <div
              className=" h-[53px] px-4 w-full flex-col flex justify-center items-center cursor-pointer hover:bg-hoverColor hover:font-bold hover:text-foreground"
              onClick={() => {
                setMode(PostViewMode.ForYou);
              }}
            >
              <p
                className={cn(
                  " flex-1 flex items-center",
                  mode === PostViewMode.ForYou && "font-bold text-foreground"
                )}
              >
                For you
              </p>
              {mode === PostViewMode.ForYou && (
                <div className=" min-w-[56px] h-1 bg-[#1d9bf0] rounded-full"></div>
              )}
            </div>
            <div
              className=" h-[53px] px-4 w-full flex-col flex justify-center items-center cursor-pointer hover:bg-hoverColor hover:font-bold hover:text-foreground"
              onClick={() => {
                setMode(PostViewMode.Following);
              }}
            >
              <p
                className={cn(
                  " flex-1 flex items-center",
                  mode === PostViewMode.Following && "font-bold text-foreground"
                )}
              >
                Following
              </p>
              {mode === PostViewMode.Following && (
                <div className=" min-w-[56px] h-1 bg-[#1d9bf0] rounded-full"></div>
              )}
            </div>
          </div>
          <div className="border-b border-[#2f3336]">
            <CreatePost data={data} />
          </div>
          {newFeed?.data.tweets.map((item, index) => {
            return <TweetPostItem key={index} data={item} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Home;
