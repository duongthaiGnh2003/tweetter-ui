import { ca, cs } from "date-fns/locale";
import { Mail, Search, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { JSX, useEffect, useRef, useState, useTransition } from "react";

import ButtonToSign from "~/app/(auth)/_components/ButtonToSign";
import { BellIcon } from "~/components/icons/BellIcon";
import { HomeIcon } from "~/components/icons/HomeIcon";
import {
  AdsIcon,
  BookMarkIcon,
  JobIcon,
  ListIcon,
  MicroIcon,
  MoneIcon,
  SettingIcon,
} from "~/components/icons/iconsList";
import { OptionDotIcon } from "~/components/icons/OptionDotIcon";
import { OptionIcon } from "~/components/icons/OptionIcon";
import { UserGroupIcon } from "~/components/icons/UserGroupIcon";
import { UserIcon } from "~/components/icons/UserIcon";
import { XLogoIcon } from "~/components/icons/XLogoIcon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useGetCurrentUser } from "~/hook/userUser";

const sideBarMenus = [
  {
    icon: <HomeIcon />,
    title: "Home",
    to: "/",
  },
  {
    icon: <Search />,
    title: "Explore",
    more: true,
    to: "explore",
  },
  {
    icon: <BellIcon />,
    title: "Notifications",
    to: "notifications",
  },
  {
    icon: <Mail />,
    title: "Messages",
    to: "messages",
  },
  {
    icon: <ListIcon />,
    title: "Lists",
    to: "Lists",
    more: true,
  },

  {
    icon: <BookMarkIcon />,
    title: "Bookmarks",
    to: "Bookmarks",
  },
  {
    icon: <JobIcon />,
    title: "Jobs",
    to: "Jobs",
    more: true,
  },
  {
    icon: <UserGroupIcon />,
    title: "Communities",
    to: "communities",
  },
  {
    icon: <XLogoIcon className=" w-[26px] h-[26px]  " />,
    title: "Premium",
    to: "premium",
    more: true,
  },
  {
    icon: <UserGroupIcon />,
    title: "Verified Orgs",
    to: "verified_orgs",
    more: true,
  },
  {
    icon: <UserIcon />,
    title: "Profile",
    to: "profile",
  },
];
const defaultOptionList = [
  {
    icon: <MoneIcon />,
    title: "Monetization",
    to: "Monetization",
  },
  {
    icon: <AdsIcon />,
    title: "Ads",
    to: "Ads",
  },

  {
    icon: <MicroIcon />,
    title: "Create your Space",
    to: "Create_your_space",
  },

  {
    icon: <SettingIcon />,
    title: "Settings and privacy",
    to: "Settings_and_privacy",
  },
];

const generateAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random`;
function LeftSideBar() {
  const { data } = useGetCurrentUser();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [OptionList2, setOptionList2] = useState(defaultOptionList);

  const [itemHeight, setItemHeight] = useState(54);

  const handleHideAndBlockMenu = () => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;

    const sidebarHeight = sidebar.clientHeight;
    const innerHeight = window.innerHeight;

    const totalHeightHide = sidebarHeight + 210;
    const totalHeightShow = sidebarHeight + 90;

    const hideCount = Math.floor((totalHeightHide - innerHeight) / itemHeight);
    const showCount = Math.ceil((innerHeight - totalHeightShow) / itemHeight);
    const filteredRefs = itemRefs.current.filter(
      Boolean
    ) as HTMLAnchorElement[];

    if (innerHeight < totalHeightHide) {
      if (filteredRefs.length >= hideCount) {
        for (let i = 0; i < hideCount; i++) {
          filteredRefs[i].style.display = "none";
        }
      }
      for (let i = 0; i <= filteredRefs.length; i++) {
        if (!filteredRefs[i]) return;
        if (filteredRefs[i].style.display === "none") {
          const indexEl = filteredRefs[i].getAttribute("data-index");
          const menuItem = sideBarMenus[Number(indexEl)];

          if (!indexEl || !menuItem) return;

          setOptionList2((prev) => {
            const exists = prev.some((item) => item.to === menuItem.to);
            if (exists) return prev; // Không thêm nếu đã có

            return [menuItem, ...prev]; // Thêm vào đầu danh sách
          });
        }
      }
    }

    // Show items if screen height increased
    else if (innerHeight > totalHeightShow) {
      if (filteredRefs.length >= showCount) {
        for (let i = 0; i < showCount; i++) {
          filteredRefs[i].style.display = "block";
        }
      }
      for (let i = 0; i <= filteredRefs.length; i++) {
        if (!filteredRefs[i]) return;
        if (filteredRefs[i].style.display === "block") {
          const indexEl = filteredRefs[i].getAttribute("data-index");
          const menuItem = sideBarMenus[Number(indexEl)];

          if (!menuItem) return;

          setOptionList2((prev) => {
            const exists = prev.some((item) => item.to === menuItem.to);
            if (exists) {
              const newList = [...prev];
              newList.shift(); // xoá phần tử đầu tiên
              return newList;
            }
            return prev;
          });
        }
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleHideAndBlockMenu();
    }
  }, []);

  if (typeof window !== "undefined") {
    window.addEventListener("resize", handleHideAndBlockMenu);
  }
  return (
    <div className="flex flex-col justify-between  w-[275px] px-1  ">
      <div ref={sidebarRef}>
        <div className=" hover:bg-[#eff3f41a] rounded-full size-[50px] flex justify-center items-center">
          <XLogoIcon className=" w-[26px] h-[26px]  " />
        </div>
        <div>
          {sideBarMenus.map((item, index) => {
            return (
              <Link
                ref={(el) => {
                  if (item.more) {
                    if (el) {
                      itemRefs.current[index] = el;
                    } else {
                      // khi component unmount, xoá ref
                      itemRefs.current[index] = null;
                    }
                  }
                }}
                href={item.to}
                className=" inline-block"
                key={index}
                data-index={index}
              >
                <div className="hover:bg-[#eff3f41a] inline-flex p-3 rounded-full">
                  <div>{item.icon}</div>
                  <p className=" ml-5 mr-4 text-[20px] ">{item.title}</p>
                </div>{" "}
                {item.more && <span>{index}</span>}
              </Link>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger className=" cursor-pointer outline-none ">
              <div className="hover:bg-[#eff3f41a] rounded-full inline-flex p-3 ">
                <div>{<OptionIcon />}</div>
                <p className=" ml-5 mr-4 text-[20px]  ">More</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="pointer-events-auto  bg-background border border-black p-0 min-w-[318px]"
              style={{
                boxShadow:
                  "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
              }}
              side="top"
              align="start"
              // sideOffset={-36}
            >
              {OptionList2.map(({ icon, title, to }, index) => {
                return (
                  <DropdownMenuItem key={index} className=" p-0">
                    <Link
                      href={to}
                      className=" w-full hover:bg-[#eff3f41a] p-3"
                    >
                      <div className="  flex  w-full ">
                        <div>{icon}</div>
                        <p className=" font-bold ml-6 mr-4 text-[20px] text-foreground">
                          {title}
                        </p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href={"/compose/post"}>
          <ButtonToSign
            text="Post"
            className="mb-1 mt-2
             text-[17px] h-[50px] w-[234px] font-bold "
          />
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger className=" p-0 outline-none ">
          <div className=" flex items-center cursor-pointer  my-3 p-3 hover:bg-[#eff3f41a] rounded-full">
            <div className=" size-10 rounded-full overflow-hidden">
              <Image
                src={
                  data?.avatar
                    ? data.avatar
                    : generateAvatarUrl(data?.name as string)
                }
                alt=""
                width={100}
                height={100}
              />
            </div>
            <div className="text-start flex-1 mx-3 text-[15px] ">
              <p className="  text-foreground font-bold truncate max-w-[160px] ">
                {data?.name}
              </p>
              <p className="  truncate max-w-[160px]  text-[#71767b]  ">
                @{data?.username}
              </p>
            </div>
            <div className=" text-foreground">
              <OptionDotIcon />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className=" max-w-[300px] border-none p-0 py-3 rounded-2xl cursor-pointer "
          style={{
            boxShadow:
              "rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
          }}
          side="top"
          sideOffset={-10}
        >
          <p className="py-3 px-4 hover:bg-[#eff3f41a]">
            Add an existing account
          </p>
          <p className="py-3 px-4 hover:bg-[#eff3f41a] w-[300px] truncate">
            Log out @{data?.username}
          </p>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default LeftSideBar;
