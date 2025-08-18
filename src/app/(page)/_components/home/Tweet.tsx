"use client";
import {
  ChartNoAxesColumn,
  CircleSlash,
  Code,
  Ellipsis,
  Flag,
  Frown,
  NotepadText,
  UserRoundPlus,
  Volume,
  VolumeX,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CloseBtn from "~/components/CloseBtn";
import { MediaType, TweetPostType } from "~/components/types/tweetType";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import { cn, generateAvatarUrl } from "~/lib/utils";
import HLSPlayer from "../HLSPlayer";

const optionsListTweet = [
  {
    icons: <Frown size={20} />,
    title: "Not interested in this post",
    onclick: () => {},
  },
  {
    icons: <UserRoundPlus size={20} />,
    title: "Follow @loverrukkvn",
    onclick: () => {},
  },
  {
    icons: <NotepadText size={20} />,
    title: "Add/remove from Lists",
    onclick: () => {},
  },
  {
    icons: <VolumeX size={20} />,
    title: "Mute",
    onclick: () => {},
  },
  {
    icons: <CircleSlash size={20} />,
    title: "Block @loverrukkvn",
    onclick: () => {},
  },
  {
    icons: <ChartNoAxesColumn size={20} />,
    title: "View post engagements",
    onclick: () => {},
  },
  {
    icons: <Code size={20} />,
    title: "Embed post",
    onclick: () => {},
  },
  {
    icons: <Flag size={20} />,
    title: "Report post",
    onclick: () => {},
  },
  {
    icons: <Volume size={20} />,
    title: "Request Community Note",
    onclick: () => {},
  },
];

function TweetPostItem({ data }: { data: TweetPostType }) {
  const dataUser = data.user;
  // console.log(data);
  return (
    <div>
      <div className=" flex justify-between items-center px-4 pt-3 cursor-pointer mb-5 ">
        <div className=" flex flex-1 ">
          <Link href={dataUser.username}>
            <div className=" block size-10 rounded-full overflow-hidden mr-2 ">
              <Image
                src={
                  dataUser.avatar
                    ? dataUser.avatar
                    : generateAvatarUrl(dataUser.name as string)
                }
                alt=""
                width={100}
                height={100}
              />
            </div>
          </Link>
          <div className=" w-full">
            <div className=" flex items-center justify-between">
              <div className=" flex">
                <Link href={dataUser.username} className=" flex text-[15px]">
                  <p className="  hover:underline">{dataUser.name} </p>
                  <p className=" text-secondary ml-1">
                    <span>@{dataUser.username}</span>
                  </p>
                </Link>
                <p className="text-[15px] text-secondary">
                  <span className="px-1 ">.</span> <span>15h</span>
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className=" outline-none">
                  <CloseBtn
                    icon={<Ellipsis className=" hover:fill-current" />}
                    title="More"
                    className=" size-[35px] rounded-full hover:bg-[#1d9bf01a] hover:text-[#1d9bf0] "
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="pointer-events-auto  bg-background border border-black p-0  "
                  style={{
                    boxShadow:
                      "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
                  }}
                  side="top"
                  align="center"
                  // sideOffset={-20}
                >
                  {optionsListTweet.map((item, index) => {
                    return (
                      <DropdownMenuItem
                        className="  py-3 px-4 hover:bg-[#ffffff08] cursor-pointer  "
                        key={index}
                      >
                        <div className=" font-bold  flex  items-center ">
                          <div className="mr-3">{item.icons}</div>
                          <p>{item.title}</p>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
            <div
              className={cn(
                "mt-3 w-full grid   border border-[#2f3336] overflow-hidden rounded-2xl",
                data.medias.length === 4
                  ? "grid-cols-2 grid-rows-2 h-[300px]"
                  : data.medias.length === 2
                  ? "grid-cols-2 grid-rows-1 h-[300px]"
                  : data.medias.length === 3 &&
                    "grid-cols-2 grid-rows-2 h-[300px]"
              )}
            >
              {data.medias.map((item, index) => {
                if (item.type === MediaType.HLS) {
                  return (
                    <HLSPlayer
                      src={item.url}
                      smallVideo={data.medias.length > 1}
                      key={index}
                      className={cn(
                        data.medias.length === 3 && index === 0 && "row-span-2"
                      )}
                    />
                  );
                } else if (item.type === MediaType.Image) {
                  return (
                    <Link
                      key={index}
                      href={`/${data.user.username}/status/${data._id}/photo/${index}`}
                    >
                      <Image
                        src={item.url}
                        alt=""
                        width={360}
                        height={360}
                        className={cn(
                          "object-cover w-full h-full",
                          data.medias.length === 3 &&
                            index === 0 &&
                            "row-span-2"
                        )}
                      />
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetPostItem;
