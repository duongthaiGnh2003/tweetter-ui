import { ArrowDownToLine, LinkIcon, Share } from "lucide-react";
import CloseBtn from "~/components/CloseBtn";
import { TweetPostType } from "~/components/types/tweetType";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
function ShareTweetBtn({ data }: { data: TweetPostType }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" outline-none">
        <CloseBtn
          icon={<Share size={18} />}
          title="Share"
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
      >
        <DropdownMenuItem className="  py-3 px-4 hover:bg-[#ffffff08] cursor-pointer  ">
          <div className=" font-bold  flex  items-center ">
            <div className="mr-3">
              <LinkIcon size={18} />
            </div>
            <p>Copy link</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem className="  py-3 px-4 hover:bg-[#ffffff08] cursor-pointer  ">
          <div className=" font-bold  flex  items-center ">
            <div className="mr-3">
              <ArrowDownToLine size={18} />
            </div>
            <p>Download video</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ShareTweetBtn;
