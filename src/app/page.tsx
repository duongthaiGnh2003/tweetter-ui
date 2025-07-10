"use client";
import ButtonToSign from "./(auth)/_components/ButtonToSign";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import { AppleIcon } from "~/components/icons/AppleIcon";
import { XLogoIcon } from "~/components/icons/XLogoIcon";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FetchApi, { encodeQueryUrl, getCookie } from "~/config/base-service";
import Loading from "~/components/loading/LoadingIcon";
import LoadBox from "~/components/loading/LoadBox";
import { getCurrentLogin } from "~/service/AuthServices";
import { useGetCurrentUser } from "~/hook/userUser";

const footterTag = [
  "About",
  "Download the X app",
  "Grok",
  "Help Center",
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Ads info",
  "Blog",
  "Careers",
  "Brand Resources",
  "Advertising",
  "Marketing",
  "X for Business",
  "Developers",
  "Directory",
  "Settings",
  "© 2025 X Corp",
];

export default function Home() {
  const [urlLoginOuth, setUrlLoginOuth] = useState<string>("");

  const getGoogleAuthUrl = () => {
    const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string,
      response_type: "code",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      prompt: "consent",
      access_type: "offline",
    });
    setUrlLoginOuth(`${baseUrl}?${params.toString()}`);
  };
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    // setCookie({ name: "token", value: params.access_token });
    // setCookie({ name: "refresh_token", value: params.refresh_token });
  }, [searchParams]);

  const { data } = useGetCurrentUser();
  console.log(data);
  useEffect(() => {
    getGoogleAuthUrl();
  }, []);
  return (
    <div className=" flex flex-col justify-between h-screen">
      <div
        className=" grid grid-cols-2 items-center flex-1
      "
      >
        <div className=" flex items-center justify-center">
          <XLogoIcon className={" h-1/2 max-h-[380px] fill-current p-8"} />
        </div>
        <div className="p-5">
          <h1 className=" text-[64px] font-TwitterChirpExtendedHeavy my-12">
            Happening now
          </h1>
          <h3 className="text-[31px] font-TwitterChirpExtendedHeavy mb-8">
            Join today.
          </h3>
          <div className=" inline-block">
            <a href={urlLoginOuth}>
              <ButtonToSign
                icon={<GoogleIcon />}
                text="Sign up with Google"
                className="mb-4 hover:bg-[#f0f5fe]"
              />
            </a>
            <ButtonToSign
              icon={<AppleIcon />}
              text="Sign up with Apple"
              className=" hover:bg-[#e6e6e6]"
            />
            <div className=" flex items-center justify-center my-2">
              <div className=" flex-1 h-[1px] bg-[#595d62] mx-1 "></div>
              <p className=" uppercase text-medium  ">or</p>
              <div className=" flex-1 h-[1px] bg-[#595d62] mx-1 "></div>
            </div>
            <ButtonToSign
              text="Create account"
              className=" bg-[#1d9bf0] text-white font-bold text-[17px] mb-4 hover:bg-[#1a8cd8]"
            />
            <p className="text-[11px] mb-5">
              By signing up, you agree to the{" "}
              <a href="" className="text-[#1d9bf0]">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="" className="text-[#1d9bf0]">
                Privacy <br />
                Policy
              </a>
              , including{" "}
              <a href="" className="text-[#1d9bf0]">
                Cookie Use.
              </a>
            </p>
            <p className=" mt-10 mb-5 text-[17px] text-foreground">
              Already have an account?
            </p>
            <ButtonToSign
              text="Sign in"
              className="border border-[#595d62] bg-background font-bold text-[#1d9bf0] text-[15px] hover:bg-[#1d9bf01a] hover:border-[#536471]"
            />
          </div>
        </div>
      </div>
      <div className=" flex items-center justify-center flex-wrap px-4 py-3 ">
        {footterTag.map((item, index) => {
          return (
            <a
              key={index}
              href=""
              className=" hover:underline text-[#71767b] text-[11px] border-r pr-2 ml-2 my-1 border-[#595d62] last:border-none"
            >
              {item}
            </a>
          );
        })}
      </div>
      <div className=" fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[#5b708366] w-full h-full">
        <LoadBox />
      </div>
    </div>
  );
}
