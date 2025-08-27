import { ChartNoAxesColumn, Heart, MessageSquare } from "lucide-react";
import { Fragment } from "react";
import CloseBtn from "~/components/CloseBtn";
import { RetweetIcon } from "~/components/icons/RetweetIcon";
import { TweetPostType } from "~/components/types/tweetType";

function ActiveTweet({ data }: { data: TweetPostType }) {
  return (
    <Fragment>
      <div className=" flex  text-[14px]  gap-[2px] hover:text-[#1d9bf0]">
        <CloseBtn
          icon
          title="Reply"
          className="group items-baseline w-auto hover:bg-transparent"
        >
          <div className="size-[35px]  centerItem rounded-full group-hover:bg-[#1d9bf01a]">
            <MessageSquare size={18} />
          </div>
          <p className="ml-[2px]">{data?.comment_counts}</p>
        </CloseBtn>
      </div>

      <div className=" flex  text-[14px]  gap-[2px] hover:text-[#00ba7c]">
        <CloseBtn
          icon
          title="Repost"
          className="group items-baseline w-auto hover:bg-transparent"
        >
          <div className="size-[35px] centerItem rounded-full group-hover:bg-[#00ba7c1a]">
            <RetweetIcon />
          </div>
          <p className="ml-[2px]">{data?.retweet_counts}</p>
        </CloseBtn>
      </div>
      <div className=" flex  text-[14px]  gap-[2px] hover:text-[#f91880]">
        <CloseBtn
          icon
          title="Like"
          className="group items-baseline w-auto hover:bg-transparent"
        >
          <div className="size-[35px] centerItem rounded-full group-hover:bg-[#f918801a]">
            <Heart size={18} />
          </div>
          <p className="ml-[2px]">{data?.quote_counts}</p>
        </CloseBtn>
      </div>
      <div className=" flex  text-[14px]  gap-[2px] hover:text-[#1d9bf0]">
        <CloseBtn
          icon
          title="View"
          className="group items-baseline w-auto hover:bg-transparent"
        >
          <div className="size-[35px] centerItem rounded-full group-hover:bg-[#1d9bf01a]">
            <ChartNoAxesColumn size={18} />
          </div>
          <p className="ml-[2px]">{data?.user_views}</p>
        </CloseBtn>
      </div>
    </Fragment>
  );
}

export default ActiveTweet;
