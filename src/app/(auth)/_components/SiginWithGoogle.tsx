"use client";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import ButtonToSign from "./ButtonToSign";
import { useEffect, useState } from "react";

function SiginWithGoogle({ className }: { className?: string }) {
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

  useEffect(() => {
    getGoogleAuthUrl();
  }, []);

  return (
    <a href={urlLoginOuth}>
      <ButtonToSign
        icon={<GoogleIcon />}
        text="Sign in with Google"
        className={`mb-4 hover:bg-[#f0f5fe] ${className}`}
      />
    </a>
  );
}

export default SiginWithGoogle;
