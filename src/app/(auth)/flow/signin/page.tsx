"use client";

import { useRouter } from "next/navigation";
import Login from "~/app/(auth)/_components/Login";
import CloseBtn from "~/components/CloseBtn";
import { XLogoIcon } from "~/components/icons/XLogoIcon";

function LoginPage() {
  const router = useRouter();
  return (
    <div className=" fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[#5b708366] w-full h-full">
      <div className=" rounded-2xl bg-background min-w-[600px] h-[650px]  min-h-[400px] max-h-[90vh]  max-w-[80vw] ">
        <div className="px-4 grid grid-cols-2 items-center pt-4  ">
          <CloseBtn
            onClick={() => {
              router.push("/");
            }}
          />
          <div>
            <XLogoIcon className={"w-8 "} />
          </div>
        </div>

        <Login />
      </div>
    </div>
  );
}

export default LoginPage;
