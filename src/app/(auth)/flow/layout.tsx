"use client";
import { AppleIcon } from "~/components/icons/AppleIcon";
import { XLogoIcon } from "~/components/icons/XLogoIcon";

import { ReactNode } from "react";

import ButtonToSign from "../_components/ButtonToSign";

import SiginWithGoogle from "../_components/SiginWithGoogle";
import { useRouter } from "next/navigation";

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

export default function AuthLayout({ children }: { children?: ReactNode }) {
  const router = useRouter();
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
            <SiginWithGoogle />
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
              onClick={() => {
                router.push("/flow/signup");
              }}
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
              onClick={() => {
                router.push("/flow/signin");
              }}
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

      {children}
    </div>
  );
}
