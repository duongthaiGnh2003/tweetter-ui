"use client";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import CloseBtn from "~/components/CloseBtn";
import { MediaType, TweetPostType } from "~/components/types/tweetType";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { useGetATweet } from "~/hook/useTweet";
import { cn } from "~/lib/utils";
import HLSPlayer from "./HLSPlayer";
import ActiveTweet from "./home/ActiveTweet";
import ShareTweetBtn from "./home/ShareTweetBtn";

type ModalWindowProps = {
  username: string;
  statusId: string;
};

const ViewDetailMedia = () => {
  const router = useRouter();
  const params: ModalWindowProps = useParams();
  const searchParam = useSearchParams();
  const currentIndexMedia = searchParam.get("index");
  const { data } = useGetATweet(params?.statusId);
  const dataTweet = data?.data;

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [showComment, setShowComment] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const [rootHeight, setRootHeight] = useState(0);
  const [isNextOrPrevious, setIsNextOrPrevious] = useState({
    canNext: true,
    canPrevious: true,
  });

  const handlesetheight = () => {
    setRootHeight(window.innerHeight || 0);
  };

  useEffect(() => {
    if (api) {
      setIsNextOrPrevious({
        canNext: api?.canScrollNext(),
        canPrevious: api?.canScrollPrev(),
      });
    }
    if (typeof window !== "undefined") {
      handlesetheight();
      window.addEventListener("resize", handlesetheight);
      return () => {
        window.removeEventListener("resize", handlesetheight);
      };
    }
  }, []);
  useEffect(() => {
    if (!api) return;
    const go = () => {
      api.scrollTo(Number(currentIndexMedia), true);
    };
    // chạy ngay sau init
    go();

    // chạy lại mỗi khi embla reInit (thường xảy ra khi ảnh/layout thay đổi lúc load lần đầu)
    api.on("reInit", go);
    return () => {
      api.off("reInit", go);
    };
  }, [api]);
  const handleShowComment = () => {
    if (showComment) {
      setShowComment(false);
    } else {
      setShowComment(true);
    }
  };
  const handleReplacceParams = (next: "next" | "prev") => {
    const params = new URLSearchParams(searchParam.toString());
    if (next === "next")
      params.set("index", (Number(currentIndexMedia) + 1).toString());
    if (next === "prev")
      params.set("index", (Number(currentIndexMedia) - 1).toString());

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className=" bg-white/10 fixed inset-0 z-100 container m-auto  ">
      <div className="h-full flex  ">
        <div className={cn("bg-black/90 flex-1 h-full flex flex-col")}>
          <div className=" relative h-full">
            <div className=" absolute top-0 left-0 w-full z-10 flex justify-between items-center p-3">
              <CloseBtn className="size-[34px]" onClick={() => router.back()} />
              <CloseBtn
                title="Hide"
                icon={<ChevronsRight />}
                className="size-[34px]"
                onClick={handleShowComment}
              />
            </div>
            <div
              className=" h-full"
              // style={{
              //   height: `${rootHeight > 0 && rootHeight * 0.959}px`,
              //   width: `${rootHeight > 0 && rootHeight * 0.94}px`,
              // }}
            >
              <Carousel
                setApi={setApi}
                opts={{
                  watchDrag: false,
                  // startIndex: Number(currentIndexMedia),
                }}
                className=" h-full"
              >
                <CarouselContent className="h-full">
                  {dataTweet?.medias.map((item, index) => {
                    return (
                      <CarouselItem
                        key={index}
                        className="h-full flex justify-center"
                        onClick={() => {
                          router.back();
                        }}
                      >
                        {item.type === MediaType.Image ? (
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Image
                              src={item.url}
                              alt=""
                              width={500}
                              height={500}
                              className=" h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div
                            className=" h-full fixed"
                            ref={videoRef}
                            style={{
                              width: `${rootHeight * 0.56}px`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <HLSPlayer
                              data={{
                                media: item,
                              }}
                            />
                          </div>
                        )}
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                {isNextOrPrevious.canPrevious && (
                  <CarouselPrevious
                    className=" absolute left-0 mx-4 cursor-pointer bg-[#282626bf] border-[#5f5f5fbf] hover:bg-[#333333] size-9"
                    onClick={() => {
                      handleReplacceParams("prev");
                      if (!api) return;
                      api?.scrollPrev();
                      setIsNextOrPrevious({
                        canNext: api.canScrollNext(),
                        canPrevious: api?.canScrollPrev(),
                      });
                    }}
                  />
                )}

                {isNextOrPrevious.canNext && (
                  <CarouselNext
                    onClick={() => {
                      handleReplacceParams("next");
                      if (!api) return;
                      api?.scrollNext();
                      setIsNextOrPrevious({
                        canNext: api?.canScrollNext(),
                        canPrevious: api?.canScrollPrev(),
                      });
                    }}
                    className="absolute right-0 mx-4 cursor-pointer bg-[#282626bf] border-[#5f5f5fbf] hover:bg-[#333333] size-9 "
                  />
                )}
              </Carousel>
            </div>
          </div>

          <div className=" w-full h-[50px] max-w-[600px] m-auto px-5 flex items-center justify-between">
            <ActiveTweet data={dataTweet as TweetPostType} />
            <ShareTweetBtn data={dataTweet as TweetPostType} />
          </div>
        </div>
        <div
          className={cn("bg-red-400 ", showComment ? "w-0" : "w-[335px]")}
          style={{ transition: "all .2s linear" }}
        ></div>
      </div>
    </div>
  );
};

export default ViewDetailMedia;
