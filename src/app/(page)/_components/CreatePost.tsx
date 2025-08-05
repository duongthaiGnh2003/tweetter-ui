"use client ";
import {
  AtSign,
  Check,
  Earth,
  UserRoundCheck,
  Image as ImageIcon,
  Smile,
  MapPin,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z, { file } from "zod";
import ButtonToSign from "~/app/(auth)/_components/ButtonToSign";
import { CanReply } from "~/components/enum";
import { CheckCriendIcon, EarIcon } from "~/components/icons/iconsList";
import { UserType } from "~/components/types/userType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn, generateAvatarUrl } from "~/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseBtn from "~/components/CloseBtn";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "~/components/ui/carousel";
import { ProgressCircle } from "~/components/icons/ProgressCircle";
import { useCreateTweet, useUploadMedia } from "~/hook/useTweet";
import { TweetAudience, TweetType } from "~/components/types/tweetType";
import { uploadMediaService } from "~/service/TweetService";
import Loading from "~/components/loading/LoadingIcon";
import Tiptap from "./Tiptap";

const canReplyList = [
  {
    title: " Everyone",
    mode: CanReply.Everyone,
    icon: <Earth size={20} />,
  },
  {
    title: " Accounts you follow",
    mode: CanReply.AccountsFollow,
    icon: <UserRoundCheck size={20} />,
  },
  {
    title: " Verified accounts",
    mode: CanReply.VerifiedAccounts,
    icon: <CheckCriendIcon color="#ffff" />,
  },
  {
    title: " Only accounts you mention",
    mode: CanReply.OnlyAccountsMention,
    icon: <AtSign size={20} />,
  },
];

export type CreateFormType = z.infer<typeof inputForm>;

const inputForm = z.object({
  content: z.string().max(255),
  file: z
    .any()
    .optional()
    .refine((files) => {
      if (!files || files.length === 0) return true;
      const type = files?.[0]?.type || "";
      return type.startsWith("image/") || type.startsWith("video/");
    }, "Only image and video files are supported."),
});

function CreatePost({ data }: { data: UserType }) {
  const [canReply, setCanReply] = useState<CanReply>(CanReply.Everyone);
  const [fileList, setFileList] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const mutation = useCreateTweet();
  const mutationfile = useUploadMedia();

  const {
    register,
    formState: { errors, isLoading, isSubmitting },
    watch,
    getValues,
    handleSubmit,
    setValue,
    control,
  } = useForm<CreateFormType>({
    resolver: zodResolver(inputForm),
  });
  const [progress, setProgress] = useState(0);
  const [isSetInitContent, setIsSetInitContent] = useState(false);

  const onSubmit = async (data: CreateFormType) => {
    try {
      let resfile;
      if (fileList.length > 1) {
        resfile = await mutationfile.mutateAsync(fileList);
      }

      const res = await mutation.mutateAsync({
        type: TweetType.Tweet,
        content: data.content,
        parent_id: null,
        hashtags: [],
        mentions: [],
        audience: TweetAudience.Everyone,
        medias: resfile?.data || [],
      });

      setFileList([]);

      setIsSetInitContent(!isSetInitContent);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setFileList(Array.from(getValues("file")));
    const urls = Array.from(getValues("file")).map((file) =>
      URL.createObjectURL(file as Blob | MediaSource)
    );
    setPreviewUrls(urls);
  }, [watch("file")]);

  const handleRemoveFile = (index1: number) => {
    fileList.splice(index1, 1);
    setFileList(fileList);
    const newArr = previewUrls.filter((item, index) => index !== index1);
    setPreviewUrls(newArr);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" px-4 relative flex">
      <div className="pt-3 mr-2">
        <div className=" size-10 rounded-full overflow-hidden ">
          <Image
            src={
              data.avatar ? data.avatar : generateAvatarUrl(data.name as string)
            }
            alt=""
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className="  flex-1">
        <div className=" border-b border-[#2f3336] mt-1 flex flex-col">
          <Controller
            control={control}
            name="content"
            render={({ field }) => {
              return (
                <Tiptap
                  isSetDefaultContent={isSetInitContent}
                  setProgress={setProgress}
                  content={field.value}
                  onChange={field.onChange}
                  className=" py-3 text-[20px] leading-none outline-none  border-none "
                />
              );
            }}
          ></Controller>

          {previewUrls.length > 0 && (
            <div className=" select-none">
              <Carousel
                opts={{
                  loop: false,
                  watchDrag: fileList.length < 2 ? false : true,
                }}
              >
                <CarouselContent
                  className={cn(
                    fileList.length < 2 ? "max-h-[600px]" : " h-[290px]"
                  )}
                >
                  {fileList.map((file, index) => {
                    return (
                      <CarouselItem
                        key={previewUrls[index]}
                        className={cn(
                          "basis-1/2 ",
                          fileList.length < 2 && "basis-full"
                        )}
                      >
                        <div className=" w-full h-full overflow-hidden relative rounded-2xl ">
                          {file.type.includes("image") ? (
                            <Image
                              src={previewUrls[index]}
                              alt=""
                              width={100}
                              height={100}
                              className=" w-full h-full object-cover"
                            />
                          ) : (
                            file.type.includes("video") && (
                              <video
                                className=" w-full h-full"
                                src={previewUrls[index]}
                                controls
                              />
                            )
                          )}
                          <div
                            className=" absolute top-2 right-2 size-[30px] flex justify-center items-center cursor-pointer bg-[#0f1419bf] hover:opacity-85 rounded-full"
                            onClick={() => {
                              handleRemoveFile(index);
                            }}
                          >
                            <X size={18} />
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger className=" w-fit px-3 mb-3 rounded-full hover:bg-[#1d9bf01a] p-0 outline-none cursor-pointer ">
              <div className=" flex items-center gap-1">
                <EarIcon width={16} height={16} />
                <p className=" text-[14px] text-[#1d9bf0] font-bold ">
                  Everyone can reply
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className=" bg-background max-w-[300px] border-none p-0 pt-4 pb-1  rounded-2xl cursor-pointer "
              style={{
                boxShadow:
                  "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
              }}
            >
              <div className="mb-3 px-4">
                <p className="text-[15px] text-foreground font-bold ">
                  Who can reply?
                </p>
                <p className="text-[15px] text-secondary">
                  Choose who can reply to this post. Anyone mentioned can always
                  reply.
                </p>
              </div>

              <div>
                {canReplyList.map((item, index) => {
                  return (
                    <div
                      className="py-3 px-4 hover:bg-hoverColor flex items-center"
                      key={index}
                      onClick={() => {
                        setCanReply(item.mode);
                      }}
                    >
                      <div className=" mr-3 size-10 flex items-center justify-center bg-[#1d9bf0] rounded-full">
                        {item.icon}
                      </div>
                      <p className="text-[15px] text-foreground font-bold flex-1 ">
                        {item.title}
                      </p>
                      {canReply === item.mode && (
                        <div className="ml-5">
                          <Check size={18} color="#1d9bf0" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" flex mt-2 justify-between items-center pb-2   ">
          <div className="flex">
            <label className=" overflow-hidden   size-8">
              <CloseBtn
                icon={<ImageIcon color="#1d9bf0" size={20} />}
                title="Media"
              />

              <input
                className="  invisible"
                id="file"
                type="file"
                accept="image/*,video/*"
                multiple
                {...register("file")}
              />
            </label>
            <div className=" flex justify-center items-center cursor-pointer rounded-full hover:bg-hoverColor size-8">
              <Smile color="#1d9bf0" size={20} />
            </div>
            <div className=" flex justify-center items-center rounded-full   size-8">
              <MapPin color="#1d9bf0" size={20} className=" opacity-50" />
            </div>
          </div>
          <div className=" flex items-center">
            {getValues("content")?.length > 7 && (
              <div className="size-[25px] rotate-[-85deg] ">
                <ProgressCircle value={progress} />
              </div>
            )}
            <ButtonToSign
              submit
              text="Post"
              className={cn(
                "mx-4 w-[65px] h-[35px] font-bold bg-[#787a7a] cursor-default ",
                getValues("content")?.length > 0 && "bg-white cursor-pointer"
              )}
            />
          </div>
        </div>
      </div>

      {isLoading ||
        (isSubmitting && (
          <div
            className=" absolute top-0 left-0 right-0 bottom-0  "
            style={{ background: "rgba(0,0,0,0.3)" }}
          >
            <div className="  absolute top-1/2 left-1/2 -translate-1/2 ">
              <Loading />
            </div>
          </div>
        ))}
    </form>
  );
}

export default CreatePost;
