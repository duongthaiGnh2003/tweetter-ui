import {
  AtSign,
  Check,
  Earth,
  UserRoundCheck,
  Image as ImageIcon,
  Smile,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import ButtonToSign from "~/app/(auth)/_components/ButtonToSign";
import { CanReply } from "~/components/enum";
import { CheckCriendIcon, EarIcon } from "~/components/icons/iconsList";
import { UserType } from "~/components/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { generateAvatarUrl } from "~/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import CloseBtn from "~/components/CloseBtn";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import { Item } from "@radix-ui/react-dropdown-menu";

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

type inputFormType = z.infer<typeof inputForm>;
const inputForm = z.object({
  caption: z.string().max(255),
  file: z.instanceof(File).array(),
});
function CreatePost({ data }: { data: UserType }) {
  const [canReply, setCanReply] = useState<CanReply>(CanReply.Everyone);
  const [fileList, setFileList] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const {
    register,
    formState: { errors, isLoading, isSubmitting },
    watch,
    getValues,
    handleSubmit,
  } = useForm<inputFormType>({
    resolver: zodResolver(inputForm),
  });

  const onSubmit = (data: inputFormType) => {
    console.log(data);
  };
  useEffect(() => {
    setFileList(Array.from(getValues("file")));
    const urls = Array.from(getValues("file")).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls(urls);
  }, [watch("file")]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" px-4  flex">
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
          <input
            placeholder="What's happening?"
            className=" py-3 text-[20px] leading-none outline-none  border-none "
            {...register("caption")}
          />

          <div className=" select-none">
            <Carousel setApi={setApi}>
              <CarouselContent className=" w-[250px] h-[290px]">
                {fileList.map((file, index) => {
                  return (
                    <CarouselItem key={index} className=" ">
                      <div className=" w-full h-full overflow-hidden rounded-2xl ">
                        {file.type.includes("image") ? (
                          <Image
                            src={previewUrls[index]}
                            alt=""
                            width={100}
                            height={100}
                            className=" w-full h-full object-center"
                          />
                        ) : file.type.includes("video") ? (
                          <video
                            className=" w-full h-full"
                            src={previewUrls[index]}
                            controls
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              {api?.canScrollPrev() && <CarouselPrevious />}
              {api?.canScrollNext() && <CarouselNext />}
            </Carousel>
          </div>
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
          <ButtonToSign
            text="Post"
            className=" w-[65px] h-[35px] font-bold bg-[#787a7a] cursor-default "
          />
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
