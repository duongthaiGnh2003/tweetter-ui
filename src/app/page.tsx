"use client";
import ButtonToSign from "./(auth)/_components/ButtonToSign";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import { AppleIcon } from "~/components/icons/AppleIcon";
import { XLogoIcon } from "~/components/icons/XLogoIcon";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import FetchApi, { encodeQueryUrl, getCookie } from "~/config/base-service";
import Loading from "~/components/loading/LoadingIcon";
import LoadBox from "~/app/(auth)/_components/Login";
import { getCurrentLogin } from "~/service/AuthServices";
import { useGetCurrentUser } from "~/hook/userUser";
import AuthLayout from "./(auth)/flow/layout";

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
  return (
    <div>
      <AuthLayout />
    </div>
  );
}
