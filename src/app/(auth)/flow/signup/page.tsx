"use client";

import { useRouter, useSearchParams } from "next/navigation";
import CloseBtn from "~/components/CloseBtn";
import { XLogoIcon } from "~/components/icons/XLogoIcon";
import SiginWithGoogle from "../../_components/SiginWithGoogle";
import ButtonToSign from "../../_components/ButtonToSign";
import { AppleIcon } from "~/components/icons/AppleIcon";
import FormRegister from "../../_components/FormRegister";

function Signup() {
  const router = useRouter();
  const mode = useSearchParams().get("mode");

  return (
    <div className=" fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-[#5b708366] w-full h-full">
      <div className=" rounded-2xl flex flex-col   bg-background min-w-[600px] h-[650px]  min-h-[400px] max-h-[90vh]  max-w-[600px] overflow-hidden ">
        {mode ? (
          <div>
            <div className="px-4 grid grid-cols-3 items-center pt-4  ">
              <CloseBtn
                onClick={() => {
                  router.push("/");
                }}
              />
              <div className="flex flex-col justify-center items-center">
                <XLogoIcon className={"w-8 "} />
              </div>
              <div></div>
            </div>
            <div className=" flex flex-col flex-1  items-center  ">
              <div className="px-8 pb-12 flex flex-col gap-3 max-w-[365px]">
                <p className=" mt-5  text-[32px] font-bold ">Join X today</p>

                <SiginWithGoogle className="mb-3" />

                <ButtonToSign
                  icon={<AppleIcon />}
                  text="Sign up with Apple"
                  className="   hover:bg-[#e6e6e6]"
                />
                <div className=" flex items-center justify-center   ">
                  <div className=" flex-1 h-[1px] bg-[#595d62] mx-1 "></div>
                  <p className=" uppercase text-medium  ">or</p>
                  <div className=" flex-1 h-[1px] bg-[#595d62] mx-1 "></div>
                </div>
                <ButtonToSign
                  text="Create account"
                  className=" bg-white   font-bold text-[17px]  hover:bg-[#d7dbdc]"
                  onClick={() => {
                    router.push("/flow/signup");
                  }}
                />
                <p className="text-[13px] text-secondary  ">
                  By signing up, you agree to the{" "}
                  <a href="" className="text-[#1d9bf0] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="" className="text-[#1d9bf0] hover:underline">
                    Privacy Policy
                  </a>
                  , including{" "}
                  <a href="" className="text-[#1d9bf0] hover:underline">
                    Cookie Use.
                  </a>
                </p>
                <p className=" mt-7   text-[15px] text-secondary">
                  Have an account already?{" "}
                  <a
                    href="/flow/signin"
                    className="text-[#1d9bf0] hover:underline"
                  >
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <FormRegister />
        )}
      </div>
    </div>
  );
}
export default Signup;
